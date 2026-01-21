"""
Pydantic Models for Droomvriendjes API
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime

# ============== STATUS MODELS ==============
class StatusCheck(BaseModel):
    id: str
    client_name: str
    timestamp: datetime

class StatusCheckCreate(BaseModel):
    client_name: str

# ============== CONTACT MODELS ==============
class ContactFormCreate(BaseModel):
    naam: str
    email: str
    telefoon: Optional[str] = ""
    onderwerp: str
    bericht: str
    page_url: Optional[str] = ""

# ============== CART/ORDER MODELS ==============
class CartItem(BaseModel):
    id: int
    name: str
    price: float
    quantity: int

class CheckoutStartedCreate(BaseModel):
    customer_email: str
    cart_items: List[CartItem]
    total_amount: float
    session_id: str

class OrderItem(BaseModel):
    product_id: int
    name: str
    price: float
    quantity: int
    image: Optional[str] = None

class OrderCreate(BaseModel):
    customer_email: str
    customer_name: str
    customer_phone: Optional[str] = ""
    shipping_address: str
    shipping_city: str
    shipping_postal: str
    shipping_country: str = "NL"
    items: List[OrderItem]
    total_amount: float
    customer_comment: Optional[str] = ""

class OrderResponse(BaseModel):
    order_id: str
    status: str
    total_amount: float
    payment_url: Optional[str] = None
    message: str

# ============== PAYMENT MODELS ==============
class PaymentCreate(BaseModel):
    order_id: str
    method: Optional[str] = "ideal"

# ============== DISCOUNT MODELS ==============
class DiscountCodeValidate(BaseModel):
    code: str
    cart_total: float

class DiscountCodeCreate(BaseModel):
    code: str
    discount_type: str  # 'percentage', 'fixed', 'free_shipping'
    discount_value: float  # percentage or fixed amount
    min_order_amount: Optional[float] = 0
    max_uses: Optional[int] = None  # None = unlimited
    valid_from: Optional[datetime] = None
    valid_until: Optional[datetime] = None
    active: bool = True

class DiscountCodeUpdate(BaseModel):
    code: Optional[str] = None
    discount_type: Optional[str] = None
    discount_value: Optional[float] = None
    min_order_amount: Optional[float] = None
    max_uses: Optional[int] = None
    valid_from: Optional[datetime] = None
    valid_until: Optional[datetime] = None
    active: Optional[bool] = None

class DiscountCodeResponse(BaseModel):
    id: str
    code: str
    discount_type: str
    discount_value: float
    min_order_amount: float
    max_uses: Optional[int]
    current_uses: int
    valid_from: Optional[datetime]
    valid_until: Optional[datetime]
    active: bool
    created_at: datetime

# ============== GIFT CARD MODELS ==============
class GiftCardPurchase(BaseModel):
    sender_name: str
    sender_email: str
    recipient_name: str
    recipient_email: str
    amount: float
    message: Optional[str] = ""

# ============== ADMIN MODELS ==============
class AdminLogin(BaseModel):
    username: str
    password: str

class TrackingUpdate(BaseModel):
    tracking_number: str
    carrier: str = "PostNL"

# ============== SENDCLOUD MODELS ==============
class SendcloudParcelCreate(BaseModel):
    order_id: str
    shipping_method_id: Optional[int] = None

# ============== GOOGLE ADS MODELS ==============
class CreateCampaignRequest(BaseModel):
    name: str
    daily_budget: float
    start_date: Optional[str] = None
    end_date: Optional[str] = None

# ============== EMAIL MODELS ==============
class AbandonedCartCreate(BaseModel):
    email: str
    cart_items: List[CartItem]
    cart_total: float

class CheckoutTrackRequest(BaseModel):
    email: str
    cart_items: List[CartItem]
    cart_total: float
    session_id: Optional[str] = None

class ManualEmailSend(BaseModel):
    to_email: str
    subject: str
    content: str

class SubscriberCreate(BaseModel):
    email: str
    name: Optional[str] = ""

# ============== PRODUCT MODELS ==============
class ProductCreate(BaseModel):
    name: str
    short_name: str
    price: float
    original_price: Optional[float] = None
    image: str
    gallery: Optional[List[str]] = []
    description: str
    features: List[str] = []
    benefits: List[str] = []
    rating: float = 4.5
    reviews: int = 0
    badge: Optional[str] = None
    in_stock: bool = True
    age_range: str = "Vanaf 0 maanden"
    warranty: str = "14 dagen geld-terug-garantie"
    item_id: Optional[str] = None
    item_category: str = "Knuffels"
    item_category2: Optional[str] = None
    item_category3: Optional[str] = None
    item_variant: Optional[str] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    short_name: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    image: Optional[str] = None
    gallery: Optional[List[str]] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None
    benefits: Optional[List[str]] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    badge: Optional[str] = None
    in_stock: Optional[bool] = None
    age_range: Optional[str] = None
    warranty: Optional[str] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    short_name: str
    price: float
    original_price: Optional[float]
    image: str
    gallery: List[str]
    description: str
    features: List[str]
    benefits: List[str]
    rating: float
    reviews: int
    badge: Optional[str]
    in_stock: bool
    age_range: str
    warranty: str
