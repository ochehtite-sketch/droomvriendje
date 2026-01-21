# Droomvriendjes - Product Requirements Document

## Original Problem Statement
Nederlandse e-commerce website voor knuffels/slaapknuffels met volledige webshop functionaliteit, admin dashboard, betalingsintegratie, en marketing tools.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Shadcn/UI
- **Backend:** FastAPI (modulaire structuur), Motor (Async MongoDB), Pydantic
- **Database:** MongoDB Atlas
- **Integrations:** Mollie (Payments), Sendcloud (Shipping), SMTP (Email), Google Ads API

---

## Completed Features (22 Jan 2026)

### ✅ NIEUW: Admin Panel Kortingscodes
- Volledige CRUD voor kortingscodes via `/admin/discount-codes`
- Ondersteunde types: percentage korting, vast bedrag, gratis verzending
- Features: vervaldatum, max. gebruik, minimaal bestelbedrag
- 4 standaard codes geseeded: WELKOM10, WINTER25, GRATISVERZENDING, 5EUROKORTING
- Backend route: `/api/discount-codes/*`
- Validatie endpoint: `/api/discount-codes/validate`

### ✅ NIEUW: Admin Panel Producten
- Volledige CRUD voor producten via `/admin/products`
- 11 producten gemigreerd van mockData naar MongoDB
- Bewerkbare velden: naam, prijs, afbeelding, beschrijving, badge, voorraad
- Backend route: `/api/products/*`
- Frontend haalt producten nu van API in plaats van mockData

### ✅ NIEUW: Modulaire Backend Structuur
- Routes verplaatst naar `/app/backend/routes/`:
  - `products.py` - Product CRUD API
  - `discount_codes.py` - Kortingscodes API
- Models in `/app/backend/models/schemas.py`
- Database helpers in `/app/backend/utils/database.py`
- Automatische database seeding bij startup

### ✅ Core E-commerce
- Product catalog met knuffels/slaapknuffels
- Winkelwagen met "2e knuffel 50% korting" logica
- Checkout flow met meerdere betaalmethodes (iDEAL, creditcard, PayPal, Klarna, Bancontact)
- Mollie betalingsintegratie (werkend in productie)

### ✅ Email Marketing System
- **Abandoned Cart Tracking:** Automatische tracking wanneer klant e-mail invult op checkout
- **Automatische Email Flow:** 
  - Mail 1: Na 1 uur (herinnering)
  - Mail 2: Na 24 uur (social proof + benefits)
  - Mail 3: Na 72 uur (laatste kans + 15% korting code)
- **Cart Recovery:** Automatisch markeren als "recovered" bij succesvolle betaling
- **Background Scheduler:** Automatische verwerking elke 15 minuten (geen externe cron nodig!)
- **Admin Dashboard:** `/admin/email-marketing` met statistieken, verlaten wagens overzicht, email queue

### ✅ CRO Optimalisaties (21 Jan 2026 - NIEUW)
- **Homepage Hero Sectie:**
  - Nieuwe headline: "Geef je kind het cadeau van een rustige nacht"
  - Social proof: "10.000+ ouders", "4.9/5", "86% slaapt beter"
  - Groene CTA knop met prijsindicatie: "Bestel Nu - Vanaf €39,95"
  - Floating badges: "100% Tevredenheidsgarantie", "Populairste keuze"
  - Urgency element: "Winter Sale: 2e knuffel 50% korting"
  - **NIEUW:** Klant avatars naast sterren rating
  - **NIEUW:** "(500+ reviews)" tekst toegevoegd
- **Trust Badges:**
  - Gratis verzending, Morgen in huis, 14 dagen retour, CE gecertificeerd
  - Betaalmethode icons: iDEAL, Creditcard, PayPal, Klarna, Apple Pay, Bancontact

### ✅ Reviews/Testimonials Verbeteringen (22 Jan 2026 - NIEUW)
- **Homepage Testimonials Sectie (Trustpilot-stijl):**
  - Trustpilot badge: groene ster met "Trustpilot" tekst
  - "Vertrouwd door 10.000+ ouders" headline
  - 5 groene sterren met 4.9/5 rating
  - Klant avatars met "+9K" badge
  - Moderne review cards met:
    - Groene Trustpilot-stijl sterren (vierkante blokken)
    - Klant avatars
    - "Geverifieerde aankoop" badges
    - Review titels met emoji's
- **Homepage Reviews Sectie:**
  - "Echte Reviews van Echte Ouders" headline
  - Rating: 4.9/5 met 500+ geverifieerde reviews
  - Verbeterde review cards met:
    - Klant avatars
    - Groene sterren
    - Product tags met emoji's
    - "Bekijk Alle Reviews" CTA knop
- **Reviews Pagina (/reviews) - Volledige Redesign:**
  - Trustpilot-achtige hero sectie
  - Rating breakdown met staafgrafieken (5 ster: 27, 4 ster: 3, etc.)
  - Product filter sidebar
  - Sorteer op: Meest recent / Hoogste beoordeling
  - Groene Trustpilot-stijl sterren per review
  - "Geverifieerd" badge styling
  - CTA footer met "Word ook een tevreden klant!"
- **Product Pagina Reviews:**
  - "Klantbeoordelingen" badge
  - Product-specifieke titel: "Wat Klanten Zeggen Over [Product]"
  - Rating weergave met sterren en review count
  - Verbeterde review cards met avatars en Trustpilot-stijl sterren
- **Product Kaarten (Homepage & /knuffels):**
  - Bruine "In Winkelwagen" buttons
  - Sterren rating met "(X reviews)" tekst
  - "Op voorraad - morgen in huis" status
- **Checkout Optimalisatie:**
  - Gradient achtergrond (roze → paars)
  - Opmerkingen veld voor speciale wensen
  - Verbeterde payment method selectie met emoji's en "Populair" badge
  - Trust indicators: SSL beveiligd, 14 dagen retour
  - Grotere betaalknop met slot-icoon
- **Product Pagina (PDP) CRO:**
  - Urgency badge met product status
  - Emotionele subtitle: "Helpt je kindje sneller inslapen"
  - Social proof bar: "86% van ouders zegt: kind slaapt beter"
  - Emotionele product beschrijving met 💜 emoji
  - Prijs met doorgestreepte "was-prijs" en korting badge
  - Key features grid: sterrenhemel, white noise, timer, wasbaar
  - Groene CTA knop: "Bestel Nu - €XX,XX"
  - Stock urgency: "Nog maar X op voorraad - bestel snel!"
  - Trust badges: proefslapen, verzending, CE, Nederlandse klantenservice
  - 100% Tevredenheidsgarantie banner
- **Footer:**
  - Betaalmethode icons
  - SSL Beveiligd indicator
  - Uitgebreide navigatie links

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

### ✅ P0 - Productie Betalingen - OPGELOST
- **Status:** OPGELOST
- **Issue:** Productie site gebruikte test_ key
- **Oplossing:** Gebruiker heeft live_ Mollie key ingesteld in productie environment

### 🟢 P0 - Google Ads OAuth
- **Status:** GEBLOKKEERD op gebruikersactie - maar gebruiker geeft aan "DONE"
- **Issue:** `redirect_uri_mismatch` error
- **Actie:** Gebruiker geeft aan dit opgelost te hebben

### 🟢 P1 - Undefined Image URLs
- **Status:** OPGELOST
- **Issue:** Sommige product afbeeldingen hadden "undefined" URLs
- **Actie:** Gebruiker geeft aan dit opgelost te hebben

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
