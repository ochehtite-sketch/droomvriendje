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

### 17 januari 2026 - Sessie 2
- ✅ **Google Ads API Integratie** - Volledige backend service met OAuth flow
- ✅ **Shopping Campaigns Admin** - Nieuwe pagina `/admin/shopping-campaigns`
- ✅ **OAuth Callback** - `/admin/google-ads/callback` voor account koppeling
- ✅ **Google AdSense** - Advertenties op knuffels, blogs en product pagina's
- ✅ **Developer Token** opgeslagen: `Gy0ry8CVqgm7Dar4dXhHkg`
- ✅ **Manager Account ID** opgeslagen: `362-584-3742`

### 17 januari 2026 - Sessie 1
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
- [ ] **OAuth Autorisatie** - Verbind Google Ads account via `/admin/shopping-campaigns`
- [ ] **Cadeaubon flow verificatie** - End-to-end test door gebruiker

### P1 - Hoog
- [ ] **Shopping Campagne Aanmaken** - Na OAuth koppeling
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
- **Analytics:** Google Analytics 4 (G-HGF9SEQG7Q), Google Tag Manager (GTM-W9PZRP4B)
- **Ads:** Google AdSense (ca-pub-3408254396794902)

## Key Endpoints
- `GET /api/feed/products` - JSON product feed
- `GET /api/feed/google-shopping.xml` - XML feed voor Merchant Center
- `GET /api/google-ads/status` - API configuratie status
- `GET /api/google-ads/oauth-url` - Start OAuth flow
- `POST /api/google-ads/oauth-callback` - OAuth callback handler
- `GET /api/google-ads/campaigns` - Ophalen Shopping campagnes
- `POST /api/google-ads/campaigns/create` - Nieuwe campagne aanmaken
- `POST /api/orders` - Nieuwe bestelling
- `POST /api/payments/create` - Mollie betaling
- `POST /api/gift-card/purchase` - Cadeaubon kopen

## Admin Pagina's
- `/admin/google-ads` - Keywords, advertentieteksten, campagne data
- `/admin/google-ads/callback` - OAuth callback handler
- `/admin/merchant-feed` - Product feed voor Merchant Center
- `/admin/shopping-campaigns` - Shopping campagnes beheer

## Credentials (opgeslagen in backend/.env)
- Mollie API Key (LIVE)
- SMTP credentials (TransIP)
- Google OAuth Client ID & Secret
- Google Ads Developer Token: `Gy0ry8CVqgm7Dar4dXhHkg`
- Google Ads Customer ID: `932-209-5782`
- Google Ads Manager ID: `362-584-3742`
- Google Merchant Center ID: `5713316340`
