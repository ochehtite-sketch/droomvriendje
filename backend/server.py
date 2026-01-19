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

# MongoDB connection - Support both local and Atlas MongoDB
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'droomvriendje')

# Initialize MongoDB client
try:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    logger.info(f"MongoDB connected to: {db_name}")
except Exception as e:
    logger.error(f"MongoDB connection error: {e}")
    raise

# Mollie configuration - load dynamically for production
def get_mollie_api_key():
    """Get Mollie API key from environment, with proper fallback"""
    key = os.environ.get('MOLLIE_API_KEY', '')
    if not key:
        logger.warning("MOLLIE_API_KEY not set in environment!")
    return key

def get_mollie_client():
    """Create a new Mollie client with current API key"""
    api_key = get_mollie_api_key()
    if not api_key:
        raise ValueError("MOLLIE_API_KEY not configured")
    mollie_client = MollieClient()
    mollie_client.set_api_key(api_key)
    return mollie_client

MOLLIE_API_KEY = os.environ.get('MOLLIE_API_KEY', '')
MOLLIE_PROFILE_ID = os.environ.get('MOLLIE_PROFILE_ID', '')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://droomvriendjes.nl')
API_URL = os.environ.get('API_URL', 'https://droomvriendjes.nl')

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

# ============== GOOGLE SHOPPING FEED CONSTANTS ==============
SHOP_URL = os.environ.get('SHOP_URL', 'https://droomvriendjes.nl')
MERCHANT_CENTER_ID = os.environ.get('GOOGLE_MERCHANT_CENTER_ID', '5713316340')

# Product data for Google Shopping Feed
PRODUCTS_DATA = [
    {
        "id": "KNUF_001",
        "title": "Baby Slaapmaatje Leeuw - Projector Nachtlamp met White Noise",
        "description": "Projector nachtlamp met rustgevende geluiden. Perfect voor een betere nachtrust.",
        "link": "/product/1",
        "image_link": "https://i.imgur.com/E4g3eOy.jpeg",
        "additional_image_links": ["https://i.imgur.com/zYLuTAg.jpeg", "https://i.imgur.com/WfHQKKr.jpeg"],
        "availability": "in_stock",
        "price": "49.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Wilde Dieren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Geel/Bruin",
        "material": "Pluche",
        "shipping_weight": "0.5 kg"
    },
    {
        "id": "KNUF_002",
        "title": "Baby Nachtlamp Schaap - Slaapknuffel met Sterrenprojector",
        "description": "Slaapknuffel met projector en white noise. Helpt je kind tot rust te komen.",
        "link": "/product/2",
        "image_link": "https://i.imgur.com/vYpeb4c.jpeg",
        "additional_image_links": ["https://i.imgur.com/62h7jyd.jpeg", "https://i.imgur.com/JxKouOL.jpeg"],
        "availability": "in_stock",
        "price": "59.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Boerderijdieren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Wit/Crème",
        "material": "Pluche",
        "shipping_weight": "0.5 kg"
    },
    {
        "id": "KNUF_003",
        "title": "Teddy Projector Knuffel - Bruine Beer met Nachtlicht",
        "description": "Bruine teddy met nachtlicht en rustgevende geluiden. Voor een rustige nachtrust.",
        "link": "/product/3",
        "image_link": "https://i.imgur.com/jM6J4oV.jpeg",
        "additional_image_links": ["https://i.imgur.com/bMpTi4F.jpeg", "https://i.imgur.com/LuZnyJN.jpeg"],
        "availability": "in_stock",
        "price": "59.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Beren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Bruin",
        "material": "Pluche",
        "shipping_weight": "0.5 kg"
    },
    {
        "id": "KNUF_004",
        "title": "Pinguïn Nachtlampje - Slaapknuffel met Projectie",
        "description": "Schattige pinguïn met sterrenprojector en rustgevende geluiden.",
        "link": "/product/4",
        "image_link": "https://i.imgur.com/sYVb8K4.jpeg",
        "additional_image_links": ["https://i.imgur.com/RqYk1oe.jpeg"],
        "availability": "in_stock",
        "price": "59.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Pooldieren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Blauw/Wit",
        "material": "Pluche",
        "shipping_weight": "0.5 kg"
    },
    {
        "id": "KNUF_005",
        "title": "Dinosaurus Slaapknuffel - Stoere Dino met Nachtlamp",
        "description": "Stoere dinosaurus met nachtlamp en white noise. Perfect voor avonturiers!",
        "link": "/product/5",
        "image_link": "https://i.imgur.com/z4cyllw.jpeg",
        "additional_image_links": ["https://i.imgur.com/mWJSBxI.jpeg"],
        "availability": "in_stock",
        "price": "59.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Fantasiedieren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Groen",
        "material": "Pluche",
        "shipping_weight": "0.5 kg"
    },
    {
        "id": "KNUF_006",
        "title": "Slaapknuffel Duo Schaap & Teddy - Voordeelset",
        "description": "Twee schattige slaapknuffels met nachtlampjes. Perfect voor broertjes en zusjes!",
        "link": "/product/6",
        "image_link": "https://i.imgur.com/4blLAM7.jpeg",
        "additional_image_links": ["https://i.imgur.com/1JbBGgT.jpeg"],
        "availability": "in_stock",
        "price": "89.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Voordeelsets > Duo Sets",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Wit/Bruin",
        "material": "Pluche",
        "shipping_weight": "1.0 kg"
    },
    {
        "id": "KNUF_007",
        "title": "Beer Sterrenprojector Nachtlamp - Slaapknuffel",
        "description": "Schattige beer met sterrenprojector en rustgevende slaapgeluiden.",
        "link": "/product/7",
        "image_link": "https://i.imgur.com/q2c7zsP.jpeg",
        "additional_image_links": ["https://i.imgur.com/xyXHy7f.jpeg"],
        "availability": "in_stock",
        "price": "59.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Beren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Beige",
        "material": "Pluche",
        "shipping_weight": "0.4 kg"
    },
    {
        "id": "KNUF_008",
        "title": "Schaap Knuffel Nachtlampje - Liggend Schaapje",
        "description": "Liggend schaapje met kalmerend licht en rustgevende geluiden. Super zacht!",
        "link": "/product/8",
        "image_link": "https://i.imgur.com/8mKVYOY.jpeg",
        "additional_image_links": ["https://i.imgur.com/N1vjMHQ.jpeg"],
        "availability": "in_stock",
        "price": "59.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Boerderijdieren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Wit/Crème",
        "material": "Pluche",
        "shipping_weight": "0.5 kg"
    },
    {
        "id": "KNUF_009",
        "title": "Kalmerende Eenhoorn Knuffel - Magische Unicorn",
        "description": "Magische eenhoorn met kalmerend licht. De perfecte slaaphulp!",
        "link": "/product/9",
        "image_link": "https://i.imgur.com/KRNfDsV.jpeg",
        "additional_image_links": ["https://i.imgur.com/x4PTZXD.png"],
        "availability": "in_stock",
        "price": "59.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Fantasiedieren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Roze/Regenboog",
        "material": "Pluche",
        "shipping_weight": "0.5 kg"
    },
    {
        "id": "KNUF_011",
        "title": "Panda Projector Knuffel - Slaapknuffel met Sterrenhemel",
        "description": "Schattige panda met rustgevende muziek en nachtlicht. Perfect voor rustige nachtjes!",
        "link": "/product/11",
        "image_link": "https://i.imgur.com/fhVs30E.jpeg",
        "additional_image_links": ["https://i.imgur.com/COWpWna.jpeg"],
        "availability": "in_stock",
        "price": "49.95 EUR",
        "brand": "Droomvriendjes",
        "condition": "new",
        "google_product_category": "588 > 4186",
        "product_type": "Knuffels > Slaapknuffels > Wilde Dieren",
        "identifier_exists": "no",
        "age_group": "infant",
        "color": "Zwart/Wit",
        "material": "Pluche",
        "shipping_weight": "0.5 kg"
    }
]


# ============== HEALTH CHECK ENDPOINT (Required for Kubernetes) ==============

@app.get("/health")
async def health_check():
    """Health check endpoint for Kubernetes liveness/readiness probes"""
    return {"status": "healthy", "service": "droomvriendje-backend"}


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
    discount_code: Optional[str] = None
    discount_amount: Optional[float] = 0

class PaymentCreate(BaseModel):
    order_id: str
    payment_method: str = "ideal"

class OrderResponse(BaseModel):
    order_id: str
    status: str
    total_amount: float
    customer_email: str
    payment_method: Optional[str] = None

# Discount Code Models
class DiscountCodeValidate(BaseModel):
    code: str
    cart_total: float

class GiftCardPurchase(BaseModel):
    amount: float
    sender_name: str
    sender_email: str
    recipient_name: str
    recipient_email: str
    message: Optional[str] = ""

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


# ============== DISCOUNT CODE ENDPOINTS ==============

@api_router.post("/discount/validate")
async def validate_discount_code(data: DiscountCodeValidate):
    """Validate a discount code and return the discount amount"""
    try:
        code = data.code.strip().upper()
        
        # Check if it's a gift card code (starts with DV-)
        if code.startswith("DV-"):
            gift_card = await db.gift_cards.find_one({
                "code": code,
                "status": "active"
            })
            
            if gift_card:
                remaining = gift_card.get("remaining_amount", gift_card.get("amount", 0))
                discount = min(remaining, data.cart_total)
                return {
                    "valid": True,
                    "code": code,
                    "type": "gift_card",
                    "discount_amount": discount,
                    "message": f"Cadeaubon toegepast: -€{discount:.2f}"
                }
            else:
                return {
                    "valid": False,
                    "message": "Ongeldige of verlopen cadeaubon"
                }
        
        # Check regular discount codes
        discount_code = await db.discount_codes.find_one({
            "code": code,
            "active": True
        })
        
        if discount_code:
            # Check if code is expired
            if discount_code.get("expires_at"):
                expires = datetime.fromisoformat(discount_code["expires_at"])
                if expires < datetime.now(timezone.utc):
                    return {"valid": False, "message": "Deze kortingscode is verlopen"}
            
            # Check usage limit
            if discount_code.get("max_uses"):
                if discount_code.get("uses", 0) >= discount_code["max_uses"]:
                    return {"valid": False, "message": "Deze kortingscode is niet meer geldig"}
            
            # Calculate discount
            discount_type = discount_code.get("type", "percentage")
            discount_value = discount_code.get("value", 0)
            
            if discount_type == "percentage":
                discount_amount = data.cart_total * (discount_value / 100)
                message = f"{discount_value}% korting toegepast"
            else:  # fixed amount
                discount_amount = min(discount_value, data.cart_total)
                message = f"€{discount_amount:.2f} korting toegepast"
            
            return {
                "valid": True,
                "code": code,
                "type": discount_type,
                "discount_amount": round(discount_amount, 2),
                "message": message
            }
        
        return {"valid": False, "message": "Ongeldige kortingscode"}
        
    except Exception as e:
        logger.error(f"Discount validation error: {str(e)}")
        return {"valid": False, "message": "Er ging iets mis bij het valideren"}


@api_router.post("/gift-card/purchase")
async def purchase_gift_card(data: GiftCardPurchase):
    """Create a gift card purchase and initiate payment"""
    try:
        # Verify Mollie API key is available
        if not MOLLIE_API_KEY or len(MOLLIE_API_KEY) < 10:
            logger.error(f"Mollie API key not configured properly. Length: {len(MOLLIE_API_KEY) if MOLLIE_API_KEY else 0}")
            raise HTTPException(status_code=500, detail="Betaalsysteem niet correct geconfigureerd")
        
        # Generate unique gift card code
        gift_card_code = f"DV-{uuid.uuid4().hex[:8].upper()}"
        
        # Create gift card record (inactive until paid)
        gift_card = {
            "code": gift_card_code,
            "amount": data.amount,
            "remaining_amount": data.amount,
            "sender_name": data.sender_name,
            "sender_email": data.sender_email,
            "recipient_name": data.recipient_name,
            "recipient_email": data.recipient_email,
            "message": data.message,
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        result = await db.gift_cards.insert_one(gift_card)
        gift_card_id = str(result.inserted_id)
        
        # Create Mollie payment - use dynamic API key loading
        api_key = get_mollie_api_key()
        if not api_key:
            raise HTTPException(status_code=500, detail="Mollie API key niet geconfigureerd")
        
        logger.info(f"Creating gift card payment with API key: {api_key[:15]}...")
        mollie_client = get_mollie_client()
        
        payment = mollie_client.payments.create({
            "amount": {
                "currency": "EUR",
                "value": f"{data.amount:.2f}"
            },
            "description": f"Droomvriendjes Cadeaubon €{data.amount:.2f}",
            "redirectUrl": f"{FRONTEND_URL}/cadeaubon/succes?id={gift_card_id}",
            "webhookUrl": f"{API_URL}/api/webhook/gift-card",
            "metadata": {
                "gift_card_id": gift_card_id,
                "type": "gift_card"
            }
        })
        
        # Update gift card with payment ID
        await db.gift_cards.update_one(
            {"_id": result.inserted_id},
            {"$set": {"mollie_payment_id": payment.id}}
        )
        
        logger.info(f"Gift card purchase initiated: {gift_card_code} for €{data.amount}")
        
        return {
            "success": True,
            "gift_card_id": gift_card_id,
            "checkout_url": payment.checkout_url
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Gift card purchase error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Betaling aanmaken mislukt: {str(e)}")


@api_router.post("/webhook/gift-card")
async def gift_card_webhook(request: Request):
    """Handle Mollie webhook for gift card payments"""
    try:
        form_data = await request.form()
        payment_id = form_data.get("id")
        
        if not payment_id:
            return {"status": "ignored"}
        
        mollie_client = get_mollie_client()
        payment = mollie_client.payments.get(payment_id)
        
        # Find the gift card
        gift_card = await db.gift_cards.find_one({"mollie_payment_id": payment_id})
        
        if not gift_card:
            logger.warning(f"Gift card not found for payment: {payment_id}")
            return {"status": "not_found"}
        
        if payment.is_paid():
            # Activate the gift card
            await db.gift_cards.update_one(
                {"mollie_payment_id": payment_id},
                {"$set": {"status": "active", "paid_at": datetime.now(timezone.utc).isoformat()}}
            )
            
            # Send gift card email to recipient
            send_gift_card_email(gift_card)
            
            # Send confirmation to sender
            send_gift_card_confirmation_email(gift_card)
            
            logger.info(f"Gift card activated and emailed: {gift_card['code']}")
        
        elif payment.is_failed() or payment.is_canceled() or payment.is_expired():
            await db.gift_cards.update_one(
                {"mollie_payment_id": payment_id},
                {"$set": {"status": "failed"}}
            )
            logger.info(f"Gift card payment failed: {gift_card['code']}")
        
        return {"status": "processed"}
        
    except Exception as e:
        logger.error(f"Gift card webhook error: {str(e)}")
        return {"status": "error"}


def send_gift_card_email(gift_card: dict):
    """Send gift card code to recipient"""
    try:
        recipient_email = gift_card.get("recipient_email")
        recipient_name = gift_card.get("recipient_name", "")
        sender_name = gift_card.get("sender_name", "Iemand")
        amount = gift_card.get("amount", 0)
        code = gift_card.get("code")
        message = gift_card.get("message", "")
        
        subject = f"🎁 Je hebt een Droomvriendjes cadeaubon ontvangen!"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #7c3aed; margin: 0;">🎁 Cadeaubon</h1>
                    <p style="color: #666; font-size: 18px;">Van {sender_name}</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 16px;">Waarde</p>
                    <p style="margin: 10px 0; font-size: 48px; font-weight: bold;">€{amount:.2f}</p>
                    <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-top: 20px;">
                        <p style="margin: 0; font-size: 14px;">Jouw kortingscode:</p>
                        <p style="margin: 10px 0 0 0; font-size: 28px; font-weight: bold; letter-spacing: 2px;">{code}</p>
                    </div>
                </div>
                
                {f'<div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;"><p style="margin: 0; color: #7c3aed; font-style: italic;">"{message}"</p></div>' if message else ''}
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://droomvriendjes.nl" style="display: inline-block; background: #7c3aed; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                        Nu Besteden
                    </a>
                </div>
                
                <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
                    <p>Voer de code in bij het afrekenen om je korting te gebruiken.</p>
                    <p>Droomvriendjes - Slaapknuffels voor een betere nachtrust</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        CADEAUBON VAN {sender_name.upper()}
        
        Hoi {recipient_name}!
        
        Je hebt een Droomvriendjes cadeaubon ontvangen ter waarde van €{amount:.2f}!
        
        Jouw kortingscode: {code}
        
        {f'Bericht: "{message}"' if message else ''}
        
        Gebruik deze code bij het afrekenen op droomvriendjes.nl
        
        Veel plezier met je nieuwe Droomvriendjes!
        """
        
        return send_email(recipient_email, subject, html_content, text_content)
        
    except Exception as e:
        logger.error(f"Failed to send gift card email: {str(e)}")
        return False


def send_gift_card_confirmation_email(gift_card: dict):
    """Send confirmation to gift card purchaser"""
    try:
        sender_email = gift_card.get("sender_email")
        sender_name = gift_card.get("sender_name", "")
        recipient_name = gift_card.get("recipient_name", "")
        recipient_email = gift_card.get("recipient_email")
        amount = gift_card.get("amount", 0)
        code = gift_card.get("code")
        
        subject = f"✅ Je cadeaubon is verzonden naar {recipient_name}!"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h1 style="color: #10b981; text-align: center;">✅ Cadeaubon Verzonden!</h1>
                
                <p>Beste {sender_name},</p>
                
                <p>Je cadeaubon ter waarde van <strong>€{amount:.2f}</strong> is succesvol verzonden naar {recipient_name} ({recipient_email}).</p>
                
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>Code:</strong> {code}</p>
                    <p style="margin: 5px 0 0 0;"><strong>Ontvanger:</strong> {recipient_email}</p>
                </div>
                
                <p style="color: #666;">Bedankt voor je aankoop bij Droomvriendjes!</p>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        CADEAUBON VERZONDEN!
        
        Beste {sender_name},
        
        Je cadeaubon ter waarde van €{amount:.2f} is verzonden naar {recipient_name} ({recipient_email}).
        
        Code: {code}
        
        Bedankt voor je aankoop bij Droomvriendjes!
        """
        
        return send_email(sender_email, subject, html_content, text_content)
        
    except Exception as e:
        logger.error(f"Failed to send gift card confirmation: {str(e)}")
        return False


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
        # Debug: Log API key status
        # Get API key dynamically for production support
        api_key = get_mollie_api_key()
        logger.info(f"Mollie API Key configured: {bool(api_key)}, Length: {len(api_key) if api_key else 0}")
        
        if not api_key or len(api_key) < 30:
            raise HTTPException(status_code=500, detail="Mollie API key not configured properly")
        
        # Retrieve order from database
        order = await db.orders.find_one({"_id": ObjectId(payment.order_id)})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # Initialize Mollie client with fresh API key
        mollie_client = get_mollie_client()
        
        # Build redirect and webhook URLs
        redirect_url = f"{FRONTEND_URL}/betaling-resultaat/{payment.order_id}"
        webhook_url = f"{API_URL}/api/webhook/mollie"
        
        logger.info(f"Creating payment - Redirect: {redirect_url}, Webhook: {webhook_url}")
        logger.info(f"Order total: {order['total_amount']}, Method: {payment.payment_method}")
        
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
        
        # Initialize Mollie client with dynamic API key
        mollie_client = get_mollie_client()
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
                mollie_client = get_mollie_client()
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
        mollie_client = get_mollie_client()
        methods = mollie_client.methods.list()
        
        result_methods = []
        for m in methods:
            # Handle image attribute safely
            image_url = ""
            if hasattr(m, 'image') and m.image:
                if isinstance(m.image, dict):
                    image_url = m.image.get("svg", m.image.get("size2x", ""))
                elif hasattr(m.image, 'svg'):
                    image_url = m.image.svg
            
            result_methods.append({
                "id": m.id, 
                "description": m.description, 
                "image": image_url
            })
        
        return {"methods": result_methods}
    except Exception as e:
        logger.error(f"Get payment methods error: {str(e)}")
        # Return default methods including Apple Pay if API fails
        return {
            "methods": [
                {"id": "ideal", "description": "iDEAL", "image": ""},
                {"id": "creditcard", "description": "Creditcard", "image": ""},
                {"id": "applepay", "description": "Apple Pay", "image": ""},
                {"id": "paypal", "description": "PayPal", "image": ""},
                {"id": "klarna", "description": "Klarna", "image": ""},
                {"id": "bancontact", "description": "Bancontact", "image": ""}
            ]
        }


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


# Feed products JSON endpoint (moet voor include_router)
@api_router.get("/feed/products")
async def get_feed_products():
    """Get all products formatted for Google Shopping feed (JSON)"""
    return {
        "merchant_center_id": MERCHANT_CENTER_ID,
        "shop_url": SHOP_URL,
        "products_count": len(PRODUCTS_DATA),
        "products": PRODUCTS_DATA,
        "feed_url": f"{SHOP_URL}/api/feed/google-shopping.xml"
    }


# ============== GOOGLE ADS API ENDPOINTS ==============

class CreateCampaignRequest(BaseModel):
    campaign_name: str
    daily_budget: float
    merchant_id: Optional[int] = None

@api_router.get("/google-ads/status")
async def google_ads_status():
    """Check Google Ads API configuration status"""
    from services.google_ads_service import google_ads_service, GOOGLE_ADS_CONFIG, CUSTOMER_ID, MERCHANT_CENTER_ID
    
    return {
        "configured": google_ads_service.is_configured,
        "has_refresh_token": bool(GOOGLE_ADS_CONFIG.get("refresh_token")),
        "customer_id": CUSTOMER_ID,
        "merchant_center_id": MERCHANT_CENTER_ID,
        "developer_token_set": bool(GOOGLE_ADS_CONFIG.get("developer_token")),
        "client_id_set": bool(GOOGLE_ADS_CONFIG.get("client_id")),
        "client_secret_set": bool(GOOGLE_ADS_CONFIG.get("client_secret")),
    }

@api_router.get("/google-ads/oauth-url")
async def get_google_ads_oauth_url(request: Request):
    """Get OAuth authorization URL for Google Ads"""
    from services.google_ads_service import google_ads_service
    
    # Use the request's origin for dynamic redirect URI
    # This allows testing from both preview and production
    origin = request.headers.get("origin") or request.headers.get("referer", "").rstrip("/")
    if origin:
        # Extract base URL from origin/referer
        from urllib.parse import urlparse
        parsed = urlparse(origin)
        base_url = f"{parsed.scheme}://{parsed.netloc}"
    else:
        base_url = FRONTEND_URL
    
    redirect_uri = f"{base_url}/admin/google-ads/callback"
    try:
        auth_url = google_ads_service.get_oauth_url(redirect_uri)
        return {"auth_url": auth_url, "redirect_uri": redirect_uri}
    except Exception as e:
        logger.error(f"Error generating OAuth URL: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/google-ads/oauth-callback")
async def google_ads_oauth_callback(request: Request, code: str, origin: str = None):
    """Exchange OAuth code for tokens"""
    from services.google_ads_service import google_ads_service
    
    # Use the origin parameter passed from frontend (most reliable)
    if origin:
        base_url = origin.rstrip("/")
    else:
        # Fallback to headers
        header_origin = request.headers.get("origin") or request.headers.get("referer", "").rstrip("/")
        if header_origin:
            from urllib.parse import urlparse
            parsed = urlparse(header_origin)
            base_url = f"{parsed.scheme}://{parsed.netloc}"
        else:
            base_url = FRONTEND_URL
    
    redirect_uri = f"{base_url}/admin/google-ads/callback"
    logger.info(f"OAuth callback - using redirect_uri: {redirect_uri}")
    
    try:
        tokens = google_ads_service.exchange_code_for_tokens(code, redirect_uri)
        
        # Store refresh token in database for future use
        await db.google_ads_tokens.update_one(
            {"type": "google_ads"},
            {"$set": {
                "refresh_token": tokens.get("refresh_token"),
                "updated_at": datetime.now(timezone.utc).isoformat()
            }},
            upsert=True
        )
        
        return {"success": True, "message": "OAuth completed successfully"}
    except Exception as e:
        logger.error(f"OAuth callback error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/google-ads/campaigns")
async def get_google_ads_campaigns():
    """Get all Shopping campaigns from Google Ads"""
    from services.google_ads_service import google_ads_service
    
    try:
        campaigns = google_ads_service.get_shopping_campaigns()
        return {"campaigns": campaigns, "count": len(campaigns)}
    except Exception as e:
        logger.error(f"Error fetching campaigns: {e}")
        return {"campaigns": [], "count": 0, "error": str(e)}

@api_router.post("/google-ads/campaigns/create")
async def create_google_ads_campaign(request: CreateCampaignRequest):
    """Create a new Shopping campaign"""
    from services.google_ads_service import google_ads_service
    
    try:
        result = google_ads_service.create_shopping_campaign(
            campaign_name=request.campaign_name,
            daily_budget=request.daily_budget,
            merchant_id=request.merchant_id
        )
        
        if "error" in result:
            raise HTTPException(status_code=400, detail=result)
            
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating campaign: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/google-ads/account")
async def get_google_ads_account():
    """Get Google Ads account information"""
    from services.google_ads_service import google_ads_service
    
    try:
        account_info = google_ads_service.get_account_info()
        return account_info
    except Exception as e:
        logger.error(f"Error fetching account info: {e}")
        return {"error": str(e)}


# ============== MERCHANT CENTER SFTP UPLOAD ==============

@api_router.post("/feed/upload-to-merchant-center")
async def upload_feed_to_merchant_center():
    """Upload product feed to Google Merchant Center via SFTP"""
    import paramiko
    import io
    
    # SFTP credentials from environment
    sftp_server = os.environ.get("MERCHANT_SFTP_SERVER", "partnerupload.google.com")
    sftp_port = int(os.environ.get("MERCHANT_SFTP_PORT", "19321"))
    sftp_username = os.environ.get("MERCHANT_SFTP_USERNAME", "")
    sftp_password = os.environ.get("MERCHANT_SFTP_PASSWORD", "")
    
    if not sftp_username or not sftp_password:
        raise HTTPException(status_code=500, detail="SFTP credentials niet geconfigureerd")
    
    # Generate XML feed content
    xml_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Droomvriendjes - Slaapknuffels met Nachtlampje</title>
    <link>{SHOP_URL}</link>
    <description>Ontdek onze slaapknuffels met sterrenprojector en rustgevende geluiden.</description>
'''
    
    for product in PRODUCTS_DATA:
        xml_content += f'''
    <item>
      <g:id>{product["id"]}</g:id>
      <g:title><![CDATA[{product["title"]}]]></g:title>
      <g:description><![CDATA[{product["description"]}]]></g:description>
      <g:link>{SHOP_URL}{product["link"]}</g:link>
      <g:image_link>{product["image_link"]}</g:image_link>
      <g:availability>{product["availability"]}</g:availability>
      <g:price>{product["price"]}</g:price>
      <g:brand>{product["brand"]}</g:brand>
      <g:condition>{product["condition"]}</g:condition>
      <g:google_product_category>{product["google_product_category"]}</g:google_product_category>
      <g:product_type><![CDATA[{product["product_type"]}]]></g:product_type>
      <g:identifier_exists>{product["identifier_exists"]}</g:identifier_exists>
      <g:age_group>{product["age_group"]}</g:age_group>
      <g:color>{product["color"]}</g:color>
      <g:material>{product["material"]}</g:material>
      <g:shipping>
        <g:country>NL</g:country>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>BE</g:country>
        <g:price>4.95 EUR</g:price>
      </g:shipping>
    </item>
'''
    
    xml_content += '''  </channel>
</rss>'''
    
    try:
        # Connect to SFTP
        transport = paramiko.Transport((sftp_server, sftp_port))
        transport.connect(username=sftp_username, password=sftp_password)
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        # Upload the file
        file_obj = io.BytesIO(xml_content.encode('utf-8'))
        remote_path = "/droomvriendjes_products.xml"
        sftp.putfo(file_obj, remote_path)
        
        # Close connections
        sftp.close()
        transport.close()
        
        logger.info(f"Product feed uploaded to Merchant Center: {remote_path}")
        
        return {
            "success": True,
            "message": "Product feed succesvol geüpload naar Google Merchant Center!",
            "file": remote_path,
            "products_count": len(PRODUCTS_DATA)
        }
        
    except Exception as e:
        logger.error(f"SFTP upload error: {e}")
        raise HTTPException(status_code=500, detail=f"Upload mislukt: {str(e)}")


# Include the router in the main app
app.include_router(api_router)

# ============== GOOGLE SHOPPING XML FEED ==============

from fastapi.responses import Response

@app.get("/api/feed/google-shopping.xml")
async def google_shopping_feed():
    """Generate Google Shopping Product Feed in XML format"""
    
    xml_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Droomvriendjes - Slaapknuffels met Nachtlampje</title>
    <link>{SHOP_URL}</link>
    <description>Ontdek onze slaapknuffels met sterrenprojector en rustgevende geluiden. Gratis verzending en 14 dagen retour.</description>
'''
    
    for product in PRODUCTS_DATA:
        xml_content += f'''
    <item>
      <g:id>{product["id"]}</g:id>
      <g:title><![CDATA[{product["title"]}]]></g:title>
      <g:description><![CDATA[{product["description"]}]]></g:description>
      <g:link>{SHOP_URL}{product["link"]}</g:link>
      <g:image_link>{product["image_link"]}</g:image_link>
'''
        # Additional images
        for img in product.get("additional_image_links", []):
            xml_content += f'''      <g:additional_image_link>{img}</g:additional_image_link>
'''
        
        xml_content += f'''      <g:availability>{product["availability"]}</g:availability>
      <g:price>{product["price"]}</g:price>
'''
        if "sale_price" in product:
            xml_content += f'''      <g:sale_price>{product["sale_price"]}</g:sale_price>
'''
        
        xml_content += f'''      <g:brand>{product["brand"]}</g:brand>
      <g:condition>{product["condition"]}</g:condition>
      <g:google_product_category>{product["google_product_category"]}</g:google_product_category>
      <g:product_type><![CDATA[{product["product_type"]}]]></g:product_type>
      <g:identifier_exists>{product["identifier_exists"]}</g:identifier_exists>
      <g:age_group>{product["age_group"]}</g:age_group>
      <g:color>{product["color"]}</g:color>
      <g:material>{product["material"]}</g:material>
      <g:shipping>
        <g:country>NL</g:country>
        <g:service>Gratis Verzending</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>BE</g:country>
        <g:service>Standaard Verzending</g:service>
        <g:price>4.95 EUR</g:price>
      </g:shipping>
      <g:shipping_weight>{product["shipping_weight"]}</g:shipping_weight>
      <g:return_policy_label>14_dagen_retour</g:return_policy_label>
    </item>
'''
    
    xml_content += '''  </channel>
</rss>'''
    
    return Response(content=xml_content, media_type="application/xml")


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
