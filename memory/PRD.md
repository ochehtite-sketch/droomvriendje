# Droomvriendjes - Product Requirements Document

## Original Problem Statement
Nederlandse e-commerce website voor knuffels/slaapknuffels met volledige webshop functionaliteit, admin dashboard, betalingsintegratie, en marketing tools.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Shadcn/UI
- **Backend:** FastAPI, Motor (Async MongoDB), Pydantic
- **Database:** MongoDB Atlas
- **Integrations:** Mollie (Payments), Sendcloud (Shipping), SMTP (Email), Google Ads API

---

## Completed Features (21 Jan 2026)

### ✅ Core E-commerce
- Product catalog met knuffels/slaapknuffels
- Winkelwagen met "2e knuffel 50% korting" logica
- Checkout flow met meerdere betaalmethodes (iDEAL, creditcard, PayPal, Klarna, Bancontact)
- Mollie betalingsintegratie (werkend in preview)
- Order management

### ✅ Email Marketing System (NIEUW - Vandaag geïmplementeerd)
- **Abandoned Cart Tracking:** Automatische tracking wanneer klant e-mail invult op checkout
- **Automatische Email Flow:** 
  - Mail 1: Na 1 uur (herinnering)
  - Mail 2: Na 24 uur (social proof + benefits)
  - Mail 3: Na 72 uur (laatste kans + 15% korting code)
- **Cart Recovery:** Automatisch markeren als "recovered" bij succesvolle betaling
- **Background Scheduler:** Automatische verwerking elke 15 minuten (geen externe cron nodig!)
- **Admin Dashboard:** `/admin/email-marketing` met statistieken, verlaten wagens overzicht, email queue
- **Handmatig e-mails versturen:** Via admin panel
- **Email Templates:** Welkom flow, Post-purchase flow, Win-back flow

### ✅ Admin Dashboard
- Order overzicht met datum/tijd
- Omzet statistieken
- Google Ads campaign management
- Email marketing beheer
- Conversietrechter visualisatie

### ✅ Blog System
- Blogposts over slaaptips en knuffels
- SEO-geoptimaliseerde content

### ✅ Google Ads Integration
- 285 keywords toegevoegd
- CSV export compatibel met Google Ads Editor
- Campaign structuur

---

## In Progress / Geblokkeerd

### 🔴 P0 - Productie Betalingen
- **Status:** GEBLOKKEERD op deployment
- **Issue:** Nieuwe Mollie keys werken in preview, maar productie site heeft oude keys
- **Actie:** Gebruiker moet deployen naar productie

### 🔴 P0 - Google Ads OAuth
- **Status:** GEBLOKKEERD op gebruikersactie
- **Issue:** `redirect_uri_mismatch` error
- **Actie:** Gebruiker moet redirect URI toevoegen in Google Cloud Console

### 🟡 P1 - iDEAL Activatie
- **Status:** GEBLOKKEERD op gebruikersactie
- **Issue:** "The payment method is not activated on your account"
- **Actie:** Gebruiker moet iDEAL activeren in Mollie dashboard

---

## Upcoming Tasks (P1)

1. **Google Wallet Loyalty Program** - Gebruiker toonde interesse met sample JSON
2. **Cadeaubon flow testen** - Test code: `DV-TEST0001`
3. **Sendcloud verzendlabels testen** - Volledige flow valideren
4. **Cron job voor abandoned carts** - `/api/email/process-scheduled-carts` elke 15 minuten aanroepen

---

## Future Tasks (P2+)

- Admin panel voor kortingscodes
- Kalender datumkiezer voor dashboard
- server.py refactoren naar modulaire structuur (APIRouter)
- Productcatalogus migreren van mockData.js naar MongoDB
- WordPress plugin export

---

## Key API Endpoints

### Email Marketing
- `POST /api/email/track-checkout` - Track checkout sessie (abandoned cart)
- `POST /api/email/process-scheduled-carts` - Verwerk geplande abandoned carts
- `GET /api/email/stats` - Email statistieken
- `GET /api/email/abandoned-carts` - Lijst verlaten wagens
- `POST /api/email/abandoned-cart/{cart_id}/start-flow` - Start email flow handmatig
- `POST /api/email/send` - Handmatig email versturen

### Payments
- `POST /api/payments/create` - Maak Mollie betaling
- `POST /api/webhook/mollie` - Mollie webhook (markeert ook cart als recovered)
- `GET /api/orders/{order_id}` - Order details

---

## Credentials (Test)
- **Admin:** admin / Droomvriendjes2024!
- **Mollie:** Keys in /app/backend/.env
- **SMTP:** info@droomvriendjes.nl credentials in .env

---

## Notes
- Productie URL: www.droomvriendjes.nl (vereist deployment)
- Preview URL: kids-plush.preview.emergentagent.com
- Alle wijzigingen vereisen deployment om live te gaan
