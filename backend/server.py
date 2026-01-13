from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from mollie.api.client import Client as MollieClient
from bson import ObjectId

# Configure logging FIRST (before any usage)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Mollie configuration
MOLLIE_API_KEY = os.environ.get('MOLLIE_API_KEY', '')
MOLLIE_PROFILE_ID = os.environ.get('MOLLIE_PROFILE_ID', '')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://droomvriendjes-clone.preview.emergentagent.com')
API_URL = os.environ.get('API_URL', 'https://droomvriendjes-clone.preview.emergentagent.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Order Models
class OrderItem(BaseModel):
    product_id: str
    product_name: str
    price: float
    quantity: int
    image: Optional[str] = None

class OrderCreate(BaseModel):
    customer_email: str
    customer_name: str
    customer_address: Optional[str] = None
    customer_city: Optional[str] = None
    customer_zipcode: Optional[str] = None
    items: List[OrderItem]
    total_amount: float

class PaymentCreate(BaseModel):
    order_id: str
    payment_method: str = "ideal"

class OrderResponse(BaseModel):
    order_id: str
    status: str
    total_amount: float
    customer_email: str
    payment_method: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ============== ORDER & PAYMENT ENDPOINTS ==============

@api_router.post("/orders")
async def create_order(order: OrderCreate):
    """Create a new order"""
    order_dict = {
        "customer_email": order.customer_email,
        "customer_name": order.customer_name,
        "customer_address": order.customer_address,
        "customer_city": order.customer_city,
        "customer_zipcode": order.customer_zipcode,
        "items": [item.model_dump() for item in order.items],
        "total_amount": order.total_amount,
        "currency": "EUR",
        "status": "pending",
        "mollie_payment_id": None,
        "payment_method": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    
    result = await db.orders.insert_one(order_dict)
    order_id = str(result.inserted_id)
    
    logger.info(f"Order created: {order_id}")
    return {"order_id": order_id, "status": "pending"}


@api_router.post("/payments/create")
async def create_payment(payment: PaymentCreate):
    """Create a Mollie payment for an order"""
    try:
        # Retrieve order from database
        order = await db.orders.find_one({"_id": ObjectId(payment.order_id)})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # Initialize Mollie client
        mollie_client = MollieClient()
        mollie_client.set_api_key(MOLLIE_API_KEY)
        
        # Build redirect and webhook URLs
        redirect_url = f"{FRONTEND_URL}/betaling-resultaat/{payment.order_id}"
        webhook_url = f"{API_URL}/api/webhook/mollie"
        
        logger.info(f"Creating payment - Redirect: {redirect_url}, Webhook: {webhook_url}")
        
        # Create payment with Mollie
        mollie_payment = mollie_client.payments.create({
            'amount': {
                'currency': 'EUR',
                'value': f"{order['total_amount']:.2f}"
            },
            'description': f"Droomvriendjes Bestelling #{payment.order_id[-8:]}",
            'redirectUrl': redirect_url,
            'webhookUrl': webhook_url,
            'method': payment.payment_method,
            'metadata': {
                'order_id': payment.order_id,
                'customer_email': order['customer_email']
            }
        })
        
        # Store payment reference in order
        await db.orders.update_one(
            {"_id": ObjectId(payment.order_id)},
            {"$set": {
                "mollie_payment_id": mollie_payment.id,
                "payment_method": payment.payment_method,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        # Store payment record
        await db.payments.insert_one({
            "order_id": payment.order_id,
            "mollie_payment_id": mollie_payment.id,
            "status": mollie_payment.status,
            "amount": str(order['total_amount']),
            "currency": "EUR",
            "method": payment.payment_method,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        })
        
        logger.info(f"Payment created: {mollie_payment.id} for order {payment.order_id}")
        
        return {
            "payment_id": mollie_payment.id,
            "checkout_url": mollie_payment.checkout_url,
            "status": mollie_payment.status
        }
        
    except Exception as e:
        logger.error(f"Payment creation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Payment creation failed: {str(e)}")


@api_router.post("/webhook/mollie")
async def mollie_webhook(request: Request):
    """Handle Mollie webhook notifications"""
    try:
        form_data = await request.form()
        payment_id = form_data.get("id")
        
        if not payment_id:
            logger.warning("Webhook received without payment ID")
            return {"status": "error", "message": "Missing payment ID"}
        
        logger.info(f"Webhook received for payment: {payment_id}")
        
        # Initialize Mollie client and retrieve payment status
        mollie_client = MollieClient()
        mollie_client.set_api_key(MOLLIE_API_KEY)
        payment = mollie_client.payments.get(payment_id)
        
        # Find the payment record
        db_payment = await db.payments.find_one({"mollie_payment_id": payment_id})
        if not db_payment:
            logger.warning(f"Payment not found in DB: {payment_id}")
            return {"status": "error", "message": "Payment not found"}
        
        order_id = db_payment["order_id"]
        
        # Determine order status
        if payment.is_paid():
            order_status = "paid"
        elif payment.is_pending():
            order_status = "pending"
        elif payment.is_open():
            order_status = "open"
        elif payment.is_canceled():
            order_status = "cancelled"
        elif payment.is_expired():
            order_status = "expired"
        else:
            order_status = "failed"
        
        # Update payment status
        await db.payments.update_one(
            {"mollie_payment_id": payment_id},
            {"$set": {
                "status": payment.status,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        # Update order status
        await db.orders.update_one(
            {"_id": ObjectId(order_id)},
            {"$set": {
                "status": order_status,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        logger.info(f"Order {order_id} status updated to: {order_status}")
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        return {"status": "error", "message": str(e)}


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    """Get order details and current payment status"""
    try:
        order = await db.orders.find_one({"_id": ObjectId(order_id)})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # If order has a Mollie payment ID, check current status
        if order.get("mollie_payment_id"):
            try:
                mollie_client = MollieClient()
                mollie_client.set_api_key(MOLLIE_API_KEY)
                payment = mollie_client.payments.get(order["mollie_payment_id"])
                
                # Determine current status
                if payment.is_paid():
                    current_status = "paid"
                elif payment.is_pending():
                    current_status = "pending"
                elif payment.is_open():
                    current_status = "open"
                elif payment.is_canceled():
                    current_status = "cancelled"
                else:
                    current_status = "failed"
                
                # Update if status changed
                if current_status != order["status"]:
                    await db.orders.update_one(
                        {"_id": ObjectId(order_id)},
                        {"$set": {
                            "status": current_status,
                            "updated_at": datetime.now(timezone.utc).isoformat()
                        }}
                    )
                    order["status"] = current_status
                    
            except Exception as e:
                logger.warning(f"Could not fetch Mollie status: {e}")
        
        return {
            "order_id": order_id,
            "status": order["status"],
            "total_amount": order["total_amount"],
            "customer_email": order["customer_email"],
            "customer_name": order["customer_name"],
            "payment_method": order.get("payment_method"),
            "items": order.get("items", [])
        }
        
    except Exception as e:
        logger.error(f"Get order error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/payment-methods")
async def get_payment_methods():
    """Get available payment methods from Mollie"""
    try:
        mollie_client = MollieClient()
        mollie_client.set_api_key(MOLLIE_API_KEY)
        methods = mollie_client.methods.list()
        
        return {
            "methods": [
                {"id": m.id, "description": m.description, "image": m.image.get("svg", "")}
                for m in methods
            ]
        }
    except Exception as e:
        logger.error(f"Get payment methods error: {str(e)}")
        # Return default methods if API fails
        return {
            "methods": [
                {"id": "ideal", "description": "iDEAL", "image": ""},
                {"id": "creditcard", "description": "Creditcard", "image": ""},
                {"id": "paypal", "description": "PayPal", "image": ""},
                {"id": "klarna", "description": "Klarna", "image": ""}
            ]
        }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()