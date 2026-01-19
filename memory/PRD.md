# Droomvriendjes - Product Requirements Document

## Origineel Probleem
Nederlandse e-commerce website voor slaapknuffels met nachtlampjes. Full-stack applicatie met React frontend, FastAPI backend, en MongoDB Atlas (productie database).

## Doelgroep
- Ouders van baby's en peuters
- Vrouwen 60+ die zoeken naar cadeau's
- Ouders van kinderen met extra behoeften (angst, slaapproblemen, HSP)

## Core Requirements
1. E-commerce functionaliteit met Mollie betalingen (LIVE)
2. Google Analytics 4 e-commerce tracking
3. Google Merchant Center integratie voor Shopping Ads
4. Responsieve, mobile-first design
5. Admin dashboard met funnel analytics

---

## Wat is Geïmplementeerd

### 19 januari 2026 - Admin Dashboard
- ✅ **Wachtwoord-beveiligd Admin Dashboard** - `/admin/login` en `/admin/dashboard`
- ✅ **Funnel Analytics** - Conversietrechter met afhaal-percentages
  - Checkout Gestart → Bestelling Aangemaakt → Betaling Voltooid
  - Drop-off rates en verlaten winkelwagens
- ✅ **Dashboard Statistieken:**
  - Totale omzet, bestellingen, klanten
  - Order status overzicht (in afwachting, betaald, verzonden, etc.)
  - Gemiddelde orderwaarde en conversiepercentage
- ✅ **Populaire Producten** - Top 5 best verkochte producten
- ✅ **Verlaten Winkelwagens** - Abandoned cart tracking met email adressen
- ✅ **Top Klanten** - Ranking op basis van bestedingen
- ✅ **Protected Routes** - Alle admin pagina's beveiligd
- ✅ **Admin wachtwoord in .env** - Veiliger configuratie

### 18 januari 2026 - Sendcloud & Order Management
- ✅ **Admin Orders Pagina** - `/admin/orders` voor bestellingenbeheer
- ✅ **Track & Trace** - Handmatig tracking code toevoegen met email notificatie
- ✅ **Sendcloud API Integratie** - Verzendlabels aanmaken vanuit admin panel
- ✅ **MongoDB Atlas** - Productie database verbinding gefixt

### 17 januari 2026 - Google Marketing Suite
- ✅ **Google Ads API Integratie** - Volledige backend service met OAuth flow
- ✅ **Shopping Campaigns Admin** - `/admin/shopping-campaigns`
- ✅ **OAuth Callback** - `/admin/google-ads/callback`
- ✅ **Google AdSense** - Advertenties op website
- ✅ **Google Merchant Center Feed** - XML en JSON feeds

### Eerdere Sessies
- ✅ Product slider op homepage (Swiper.js)
- ✅ `/knuffels` pagina met alle producten
- ✅ Mollie betalingen (LIVE mode)
- ✅ Email notificaties (SMTP via TransIP)
- ✅ Cadeaubon functionaliteit (gift cards)
- ✅ Contact formulier met email

---

## Prioritized Backlog

### P0 - Kritiek
- [x] **Admin Dashboard** - Compleet met funnel analytics ✅
- [ ] **Deployment naar Productie** - Alle blockers zijn opgelost

### P1 - Hoog
- [ ] **BOOST Google Ads Campagne** - Programmatisch aanmaken via API
- [ ] **Cadeaubon flow verificatie** - End-to-end test door gebruiker
- [ ] **Sendcloud Label Test** - Full E2E test van label creatie

### P2 - Medium
- [ ] Admin panel voor kortingscodes
- [ ] Gemini logo verwijderen uit product afbeeldingen
- [ ] Homepage refactoring - Gebruik globale Header/Footer

### P3 - Laag
- [ ] WordPress plugin export
- [ ] Product reviews systeem
- [ ] Wishlist functionaliteit
- [ ] Abandoned cart email sequences (FOMO)

---

## Technische Stack
- **Frontend:** React, TailwindCSS, Shadcn/UI, Swiper.js
- **Backend:** FastAPI (Python), Motor (async MongoDB)
- **Database:** MongoDB Atlas (productie)
- **Betalingen:** Mollie (LIVE)
- **Verzending:** Sendcloud API
- **Email:** SMTP via TransIP
- **Analytics:** Google Analytics 4, Google Tag Manager
- **Ads:** Google AdSense, Google Ads API

## Key API Endpoints
- **Orders & Payments:**
  - `POST /api/orders` - Nieuwe bestelling
  - `POST /api/payments/create` - Mollie betaling
  - `POST /api/webhook/mollie` - Payment webhook
  
- **Admin (Protected):**
  - `POST /api/admin/login` - Admin login
  - `GET /api/admin/verify` - Token verificatie
  - `GET /api/admin/dashboard` - Dashboard data met funnel
  - `GET /api/admin/orders` - Alle bestellingen
  - `POST /api/admin/orders/{id}/tracking` - Tracking toevoegen
  
- **Sendcloud:**
  - `GET /api/sendcloud/shipping-methods` - Verzendmethodes
  - `POST /api/sendcloud/create-parcel` - Label aanmaken

- **Google:**
  - `GET /api/feed/google-shopping.xml` - Merchant feed
  - `GET /api/google-ads/oauth-url` - OAuth start
  - `POST /api/google-ads/campaigns/create` - Campagne maken

## Admin Pagina's
- `/admin/login` - Admin inloggen
- `/admin/dashboard` - Hoofddashboard met statistieken
- `/admin/orders` - Bestellingenbeheer
- `/admin/google-ads` - Keywords en advertenties
- `/admin/merchant-feed` - Product feed beheer
- `/admin/shopping-campaigns` - Shopping campagnes

## Credentials (in backend/.env)
- Mollie API Key (LIVE): `live_snNwpUSRqr2mPhPh6CCcUDJUnaSzr9`
- MongoDB Atlas: Verbonden
- Sendcloud API: Geconfigureerd
- Admin: `admin` / `Droomvriendjes2024!`

---

## Test Rapporten
- `/app/test_reports/iteration_6.json` - Admin Dashboard tests (100% passed)
