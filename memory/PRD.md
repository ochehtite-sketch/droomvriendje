# Droomvriendjes - Product Requirements Document

## Origineel Probleem
Nederlandse e-commerce website voor slaapknuffels met nachtlampjes. Full-stack applicatie met React frontend, FastAPI backend, en MongoDB (data momenteel in mockData.js).

## Doelgroep
- Ouders van baby's en peuters
- Vrouwen 60+ die zoeken naar cadeau's
- Ouders van kinderen met extra behoeften (angst, slaapproblemen, HSP)

## Core Requirements
1. E-commerce functionaliteit met Mollie betalingen (LIVE)
2. Google Analytics 4 e-commerce tracking
3. Google Merchant Center integratie voor Shopping Ads
4. Responsieve, mobile-first design

---

## Wat is Geïmplementeerd

### 17 januari 2026
- ✅ **Google Merchant Center Feed** - `/api/feed/products` (JSON) en `/api/feed/google-shopping.xml` (XML)
- ✅ **GTM Code Update** - Vervangen naar `GTM-W9PZRP4B`
- ✅ **Google Credentials** - Client Secret, Customer ID, Merchant Center ID opgeslagen

### Eerdere Sessies
- ✅ Product slider op homepage (Swiper.js)
- ✅ `/knuffels` pagina met alle producten
- ✅ Bestsellers sectie op homepage
- ✅ Hero sectie redesign (mobile responsive)
- ✅ GA4 E-commerce tracking (view_item, add_to_cart, checkout events)
- ✅ Google Ads admin pagina (`/admin/google-ads`)
- ✅ Merchant Feed admin pagina (`/admin/merchant-feed`)
- ✅ Mollie betalingen (LIVE mode)
- ✅ Email notificaties (SMTP via TransIP)
- ✅ Cadeaubon functionaliteit (gift cards)
- ✅ Contact formulier met email

---

## Prioritized Backlog

### P0 - Kritiek
- [ ] **Developer Token** verkrijgen voor Google Ads API
- [ ] **Cadeaubon flow verificatie** - End-to-end test door gebruiker

### P1 - Hoog
- [ ] **Google Shopping Ads automatisering** - API koppeling na Developer Token
- [ ] **Admin Dashboard** - Orders en producten beheer (vervangt mockData.js)

### P2 - Medium
- [ ] Admin panel voor kortingscodes
- [ ] WordPress plugin export
- [ ] Homepage refactoring - Gebruik globale Header/Footer componenten

### P3 - Laag
- [ ] Product reviews systeem
- [ ] Wishlist functionaliteit
- [ ] Email marketing integratie

---

## Technische Stack
- **Frontend:** React, TailwindCSS, Shadcn/UI, Swiper.js
- **Backend:** FastAPI (Python)
- **Database:** MongoDB (data in mockData.js)
- **Betalingen:** Mollie (LIVE)
- **Email:** SMTP via TransIP
- **Analytics:** Google Analytics 4, Google Tag Manager

## Key Endpoints
- `GET /api/feed/products` - JSON product feed
- `GET /api/feed/google-shopping.xml` - XML feed voor Merchant Center
- `POST /api/orders` - Nieuwe bestelling
- `POST /api/payments/create` - Mollie betaling
- `POST /api/gift-card/purchase` - Cadeaubon kopen
- `POST /api/discount/validate` - Kortingscode valideren

## Credentials (opgeslagen in backend/.env)
- Mollie API Key (LIVE)
- SMTP credentials (TransIP)
- Google OAuth Client ID & Secret
- Google Ads Customer ID: 932-209-5782
- Google Merchant Center ID: 5713316340
