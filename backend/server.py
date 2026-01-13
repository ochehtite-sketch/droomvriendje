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
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://plushfriends.preview.emergentagent.com')
API_URL = os.environ.get('API_URL', 'https://plushfriends.preview.emergentagent.com')

# SMTP Email configuration
SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.transip.email')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 465))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_FROM = os.environ.get('SMTP_FROM', 'info@droomvriendjes.nl')

# Owner notification email
OWNER_EMAIL = "info@droomvriendjes.nl"

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============== EMAIL FUNCTIONS ==============

def send_email(to_email: str, subject: str, html_content: str, text_content: str, reply_to: str = None):
    """Generic email sending function with logging"""
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = f'Droomvriendjes <{SMTP_FROM}>'
        msg['To'] = to_email
        
        if reply_to:
            msg['Reply-To'] = reply_to
        
        msg.attach(MIMEText(text_content, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send email via SMTP SSL
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_FROM, to_email, msg.as_string())
        
        logger.info(f"✅ EMAIL SENT: To={to_email}, Subject={subject}")
        return True
        
    except Exception as e:
        logger.error(f"❌ EMAIL FAILED: To={to_email}, Subject={subject}, Error={str(e)}")
        return False


def send_contact_form_email(contact_data: dict):
    """Send contact form submission to owner (info@droomvriendjes.nl)"""
    naam = contact_data.get('naam', 'Onbekend')
    email = contact_data.get('email', 'Onbekend')
    telefoon = contact_data.get('telefoon', 'Niet opgegeven')
    onderwerp = contact_data.get('onderwerp', 'Geen onderwerp')
    bericht = contact_data.get('bericht', '')
    page_url = contact_data.get('page_url', 'Onbekend')
    timestamp = datetime.now(timezone.utc).strftime('%d-%m-%Y %H:%M:%S')
    
    subject = f"📬 Nieuw contactformulier: {onderwerp}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">📬 Nieuw Contactformulier</h1>
        </div>
        
        <div style="background: white; padding: 25px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Naam:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{naam}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <a href="mailto:{email}" style="color: #7c3aed;">{email}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Telefoon:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{telefoon}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Onderwerp:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{onderwerp}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Datum/tijd:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{timestamp} (UTC)</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Pagina:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px;">{page_url}</td>
                </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                <strong>Bericht:</strong>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">{bericht}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px;">
                    💡 <strong>Tip:</strong> Klik op "Beantwoorden" om direct te reageren naar {email}
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    NIEUW CONTACTFORMULIER
    ======================
    
    Naam: {naam}
    Email: {email}
    Telefoon: {telefoon}
    Onderwerp: {onderwerp}
    Datum/tijd: {timestamp} (UTC)
    Pagina: {page_url}
    
    BERICHT:
    {bericht}
    """
    
    return send_email(OWNER_EMAIL, subject, html_content, text_content, reply_to=email)


def send_checkout_started_email(checkout_data: dict):
    """Send checkout started notification to owner"""
    customer_email = checkout_data.get('customer_email', 'Onbekend')
    cart_items = checkout_data.get('cart_items', [])
    total_amount = checkout_data.get('total_amount', 0)
    session_id = checkout_data.get('session_id', 'Onbekend')
    timestamp = datetime.now(timezone.utc).strftime('%d-%m-%Y %H:%M:%S')
    
    # Build items HTML
    items_html = ""
    for item in cart_items:
        items_html += f"""
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{item.get('name', 'Product')}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">{item.get('quantity', 1)}x</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">€{item.get('price', 0):.2f}</td>
        </tr>
        """
    
    subject = f"🛒 Checkout gestart - {customer_email}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🛒 Checkout Gestart!</h1>
        </div>
        
        <div style="background: white; padding: 25px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 16px;">
                    <strong>⚡ Actie vereist:</strong> Een klant is begonnen met afrekenen!
                </p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Klant email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <a href="mailto:{customer_email}" style="color: #7c3aed; font-weight: bold;">{customer_email}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Datum/tijd:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{timestamp} (UTC)</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Session ID:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px;">{session_id}</td>
                </tr>
            </table>
            
            <h3 style="color: #333; margin-bottom: 10px;">Winkelwagen:</h3>
            <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px;">
                <thead>
                    <tr style="background: #7c3aed; color: white;">
                        <th style="padding: 10px; text-align: left;">Product</th>
                        <th style="padding: 10px; text-align: center;">Aantal</th>
                        <th style="padding: 10px; text-align: right;">Prijs</th>
                    </tr>
                </thead>
                <tbody>
                    {items_html}
                </tbody>
                <tfoot>
                    <tr style="background: #f3f4f6;">
                        <td colspan="2" style="padding: 12px; font-weight: bold; font-size: 16px;">Totaal</td>
                        <td style="padding: 12px; font-weight: bold; font-size: 16px; text-align: right; color: #7c3aed;">
                            €{total_amount:.2f}
                        </td>
                    </tr>
                </tfoot>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px;">
                    💬 <strong>Tip:</strong> Stuur een chat/email naar {customer_email} om te helpen met de bestelling!
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    CHECKOUT GESTART!
    =================
    
    Klant email: {customer_email}
    Datum/tijd: {timestamp} (UTC)
    Session ID: {session_id}
    
    WINKELWAGEN:
    """
    for item in cart_items:
        text_content += f"\n- {item.get('name', 'Product')} x{item.get('quantity', 1)} = €{item.get('price', 0):.2f}"
    text_content += f"\n\nTOTAAL: €{total_amount:.2f}"
    
    return send_email(OWNER_EMAIL, subject, html_content, text_content, reply_to=customer_email)


def send_order_notification_email(order_data: dict, event_type: str):
    """Send order event notification to owner"""
    order_id = str(order_data.get('_id', ''))[-8:].upper() if order_data.get('_id') else 'UNKNOWN'
    customer_email = order_data.get('customer_email', 'Onbekend')
    customer_name = order_data.get('customer_name', 'Onbekend')
    total_amount = order_data.get('total_amount', 0)
    items = order_data.get('items', [])
    timestamp = datetime.now(timezone.utc).strftime('%d-%m-%Y %H:%M:%S')
    
    # Event-specific styling
    event_config = {
        'order_placed': {
            'emoji': '📦',
            'title': 'Nieuwe Bestelling',
            'color': '#3b82f6',
            'message': 'Een nieuwe bestelling is geplaatst en wacht op betaling.'
        },
        'payment_success': {
            'emoji': '✅',
            'title': 'Betaling Geslaagd',
            'color': '#10b981',
            'message': 'De betaling is succesvol ontvangen! Bestelling kan worden verzonden.'
        },
        'payment_failed': {
            'emoji': '❌',
            'title': 'Betaling Mislukt/Afgebroken',
            'color': '#ef4444',
            'message': 'De betaling is mislukt of afgebroken door de klant.'
        }
    }
    
    config = event_config.get(event_type, event_config['order_placed'])
    
    # Build items HTML
    items_html = ""
    for item in items:
        items_html += f"""
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{item.get('product_name', 'Product')}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">{item.get('quantity', 1)}x</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">€{item.get('price', 0):.2f}</td>
        </tr>
        """
    
    subject = f"{config['emoji']} {config['title']} - #{order_id} ({customer_email})"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: {config['color']}; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">{config['emoji']} {config['title']}</h1>
        </div>
        
        <div style="background: white; padding: 25px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="padding: 15px; background: #f3f4f6; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0;">{config['message']}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Order ID:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #7c3aed;">#{order_id}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Klant naam:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{customer_name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Klant email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <a href="mailto:{customer_email}" style="color: #7c3aed;">{customer_email}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Datum/tijd:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{timestamp} (UTC)</td>
                </tr>
            </table>
            
            <h3 style="color: #333; margin-bottom: 10px;">Bestelde producten:</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #7c3aed; color: white;">
                        <th style="padding: 10px; text-align: left;">Product</th>
                        <th style="padding: 10px; text-align: center;">Aantal</th>
                        <th style="padding: 10px; text-align: right;">Prijs</th>
                    </tr>
                </thead>
                <tbody>
                    {items_html}
                </tbody>
                <tfoot>
                    <tr style="background: #f3f4f6;">
                        <td colspan="2" style="padding: 12px; font-weight: bold; font-size: 16px;">Totaal</td>
                        <td style="padding: 12px; font-weight: bold; font-size: 16px; text-align: right; color: #7c3aed;">
                            €{total_amount:.2f}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    {config['title'].upper()}
    {'=' * len(config['title'])}
    
    {config['message']}
    
    Order ID: #{order_id}
    Klant naam: {customer_name}
    Klant email: {customer_email}
    Datum/tijd: {timestamp} (UTC)
    
    BESTELDE PRODUCTEN:
    """
    for item in items:
        text_content += f"\n- {item.get('product_name', 'Product')} x{item.get('quantity', 1)} = €{item.get('price', 0):.2f}"
    text_content += f"\n\nTOTAAL: €{total_amount:.2f}"
    
    return send_email(OWNER_EMAIL, subject, html_content, text_content, reply_to=customer_email)


def send_order_confirmation_email(order_data: dict):
    """Send order confirmation email to customer"""
    try:
        customer_email = order_data.get('customer_email')
        customer_name = order_data.get('customer_name', 'Klant')
        order_id = str(order_data.get('_id', ''))[-8:].upper()
        total_amount = order_data.get('total_amount', 0)
        items = order_data.get('items', [])
        
        # Create email content
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'🧸 Bedankt voor je bestelling bij Droomvriendjes! #{order_id}'
        msg['From'] = f'Droomvriendjes <{SMTP_FROM}>'
        msg['To'] = customer_email
        
        # Build items HTML
        items_html = ""
        for item in items:
            items_html += f"""
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    {item.get('product_name', 'Product')}
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
                    {item.get('quantity', 1)}x
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
                    €{item.get('price', 0):.2f}
                </td>
            </tr>
            """
        
        # HTML email template
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #7c3aed; margin: 0;">🧸 Droomvriendjes</h1>
                </div>
                
                <!-- Main Content -->
                <h2 style="color: #333;">Bedankt voor je bestelling, {customer_name}!</h2>
                
                <p style="color: #666; line-height: 1.6;">
                    Je bestelling is succesvol ontvangen en wordt zo snel mogelijk verwerkt. 
                    Hieronder vind je een overzicht van je bestelling.
                </p>
                
                <!-- Order Info -->
                <div style="background-color: #f3e8ff; border-radius: 8px; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0; color: #7c3aed;"><strong>Bestelnummer:</strong> #{order_id}</p>
                </div>
                
                <!-- Order Items -->
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead>
                        <tr style="background-color: #7c3aed; color: white;">
                            <th style="padding: 12px; text-align: left;">Product</th>
                            <th style="padding: 12px; text-align: center;">Aantal</th>
                            <th style="padding: 12px; text-align: right;">Prijs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items_html}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="padding: 15px; font-weight: bold; font-size: 18px;">Totaal</td>
                            <td style="padding: 15px; font-weight: bold; font-size: 18px; text-align: right; color: #7c3aed;">
                                €{total_amount:.2f}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                
                <!-- Shipping Info -->
                <div style="background-color: #e8f5e9; border-radius: 8px; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0; color: #2e7d32;">
                        ✓ <strong>Gratis verzending</strong> - Voor 23:00 besteld, morgen in huis!
                    </p>
                </div>
                
                <!-- Footer -->
                <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center; color: #999;">
                    <p>Vragen over je bestelling?<br>
                    Neem contact op via <a href="mailto:info@droomvriendjes.nl" style="color: #7c3aed;">info@droomvriendjes.nl</a></p>
                    
                    <p style="font-size: 12px; margin-top: 20px;">
                        Droomvriendjes<br>
                        Schaesbergerweg 103, 6415 AD Heerlen<br>
                        KVK: 9921083
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Plain text alternative
        text_content = f"""
        Bedankt voor je bestelling bij Droomvriendjes!
        
        Beste {customer_name},
        
        Je bestelling #{order_id} is succesvol ontvangen.
        
        Totaal: €{total_amount:.2f}
        
        Je bestelling wordt zo snel mogelijk verzonden.
        Gratis verzending - Voor 23:00 besteld, morgen in huis!
        
        Vragen? Mail naar info@droomvriendjes.nl
        
        Met vriendelijke groet,
        Droomvriendjes
        """
        
        msg.attach(MIMEText(text_content, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send email via SMTP SSL
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_FROM, customer_email, msg.as_string())
        
        logger.info(f"✅ Order confirmation email sent to {customer_email}")
        return True
        
    except Exception as e:
        logger.error(f"❌ Failed to send order confirmation email: {str(e)}")
        return False


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Model
class ContactFormCreate(BaseModel):
    naam: str
    email: str
    telefoon: Optional[str] = None
    onderwerp: str
    bericht: str
    page_url: Optional[str] = None

# Checkout Started Model
class CartItem(BaseModel):
    name: str
    price: float
    quantity: int

class CheckoutStartedCreate(BaseModel):
    customer_email: str
    cart_items: List[CartItem]
    total_amount: float
    session_id: Optional[str] = None

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


# ============== CONTACT & NOTIFICATION ENDPOINTS ==============

@api_router.post("/contact")
async def submit_contact_form(contact: ContactFormCreate):
    """Handle contact form submission and send email to owner"""
    try:
        # Store contact submission in database
        contact_dict = {
            "naam": contact.naam,
            "email": contact.email,
            "telefoon": contact.telefoon,
            "onderwerp": contact.onderwerp,
            "bericht": contact.bericht,
            "page_url": contact.page_url,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.contact_submissions.insert_one(contact_dict)
        logger.info(f"Contact form submission stored: {contact.email}")
        
        # Send email notification to owner
        email_sent = send_contact_form_email(contact_dict)
        
        if email_sent:
            return {"status": "success", "message": "Bericht succesvol verzonden"}
        else:
            # Still return success if stored in DB, but log the email failure
            logger.warning(f"Contact form stored but email failed for: {contact.email}")
            return {"status": "success", "message": "Bericht ontvangen (email notificatie uitgesteld)"}
            
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Er ging iets mis: {str(e)}")


@api_router.post("/checkout-started")
async def checkout_started(checkout: CheckoutStartedCreate):
    """Track checkout start and send notification to owner"""
    try:
        # Generate session ID if not provided
        session_id = checkout.session_id or str(uuid.uuid4())[:8].upper()
        
        # Store checkout event in database
        checkout_dict = {
            "customer_email": checkout.customer_email,
            "cart_items": [item.model_dump() for item in checkout.cart_items],
            "total_amount": checkout.total_amount,
            "session_id": session_id,
            "status": "started",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.checkout_events.insert_one(checkout_dict)
        logger.info(f"Checkout started: {checkout.customer_email} - Session: {session_id}")
        
        # Send email notification to owner
        email_sent = send_checkout_started_email(checkout_dict)
        
        return {
            "status": "success",
            "session_id": session_id,
            "email_sent": email_sent
        }
            
    except Exception as e:
        logger.error(f"Checkout started error: {str(e)}")
        # Don't fail the checkout process, just log the error
        return {"status": "success", "session_id": "UNKNOWN", "email_sent": False}


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
    
    # Send order notification to owner
    order_dict['_id'] = order_id
    send_order_notification_email(order_dict, 'order_placed')
    
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
        
        # Send notifications based on payment status
        order = await db.orders.find_one({"_id": ObjectId(order_id)})
        if order:
            order['_id'] = order_id  # Use string ID for email
            
            if order_status == "paid":
                # Send confirmation email to customer
                send_order_confirmation_email(order)
                # Send success notification to owner
                send_order_notification_email(order, 'payment_success')
            elif order_status in ["cancelled", "expired", "failed"]:
                # Send failure notification to owner
                send_order_notification_email(order, 'payment_failed')
        
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


# ============== CONTACT & NOTIFICATION ENDPOINTS ==============

class ContactFormData(BaseModel):
    naam: str
    email: str
    telefoon: Optional[str] = ""
    onderwerp: str
    bericht: str
    page_url: Optional[str] = ""

class CheckoutStartedData(BaseModel):
    customer_email: str
    cart_items: List[dict]
    total_amount: float
    session_id: Optional[str] = ""

@api_router.post("/contact")
async def submit_contact_form(contact_data: ContactFormData):
    """Handle contact form submission and send email to owner"""
    try:
        # Store in database
        contact_dict = contact_data.model_dump()
        contact_dict['submitted_at'] = datetime.now(timezone.utc).isoformat()
        contact_dict['status'] = 'new'
        
        result = await db.contact_forms.insert_one(contact_dict)
        
        # Send email notification to owner
        email_success = send_contact_form_email(contact_dict)
        
        logger.info(f"Contact form submitted: {result.inserted_id}, Email sent: {email_success}")
        
        return {
            "status": "success",
            "message": "Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.",
            "email_sent": email_success
        }
        
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail="Er is een fout opgetreden bij het versturen van je bericht.")


@api_router.post("/checkout-started")
async def checkout_started(checkout_data: CheckoutStartedData):
    """Handle checkout started notification"""
    try:
        # Store checkout event
        checkout_dict = checkout_data.model_dump()
        checkout_dict['started_at'] = datetime.now(timezone.utc).isoformat()
        checkout_dict['status'] = 'started'
        
        result = await db.checkout_events.insert_one(checkout_dict)
        
        # Send email notification to owner
        email_success = send_checkout_started_email(checkout_dict)
        
        logger.info(f"Checkout started: {result.inserted_id}, Email sent: {email_success}")
        
        return {
            "status": "success",
            "message": "Checkout started notification sent",
            "email_sent": email_success
        }
        
    except Exception as e:
        logger.error(f"Checkout started error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process checkout notification")


@api_router.post("/test-email")
async def test_email(email: str = "info@droomvriendjes.nl"):
    """Test email sending (for debugging only)"""
    test_order = {
        "_id": "TEST123456",
        "customer_email": email,
        "customer_name": "Test Klant",
        "total_amount": 59.95,
        "items": [
            {"product_name": "Leeuw Slaapknuffel", "quantity": 1, "price": 59.95}
        ]
    }
    
    success = send_order_confirmation_email(test_order)
    
    if success:
        return {"status": "success", "message": f"Test email sent to {email}"}
    else:
        return {"status": "error", "message": "Failed to send test email"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()