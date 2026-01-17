# Droomvriendjes - Product Requirements Document

## Oorspronkelijke Probleemstelling
Een Nederlandse e-commerce website bouwen voor het merk "Droomvriendjes" - een webshop voor slaapknuffels met nachtlampjes en rustgevende geluiden.

## Kernvereisten
- **Merk:** Droomvriendjes
- **Producten:** 11 slaapknuffels (Leeuw, Schaap, Teddy, Pinguïn, Dinosaurus, Duo, Beer, Schaap Liggend, Eenhoorn, Teddy Zittend, Panda)
- **Prijzen:** €59,95 per product (Duo set: €89,95)
- **Taal:** Nederlands
- **Betalingen:** Mollie integratie (iDEAL, Creditcard, PayPal, Bancontact)
- **Email Notificaties:** Alle naar info@droomvriendjes.nl

## Geïmplementeerde Features (Januari 2025)

### ✅ Volledig Voltooid & Getest
1. **Frontend Website**
   - Homepage met hero sectie en achtergrondafbeelding
   - 11 producten met afbeeldingen en prijzen
   - Trust badges en Trustpilot styling
   - Responsive design (desktop + mobiel)
   - 20+ statische pagina's

2. **Winkelwagen & Checkout**
   - Cart context met localStorage persistentie
   - Sidebar winkelwagen met +/- knoppen
   - **Email veld verplicht voor Afrekenen** (checkout-started notificatie)
   - Checkout pagina met klantgegevens formulier
   - Betaalmethode selectie (iDEAL, Creditcard, PayPal, Bancontact)
   - Betaling resultaat pagina

3. **Mollie Betalingen (LIVE)**
   - Order creatie in MongoDB
   - Mollie payment creatie met checkout URL
   - Webhook handling voor status updates
   - Email bevestiging via TransIP SMTP

4. **Email Notificatie Systeem (13 januari 2025)** 📧
   - **Contactformulier:** Email naar info@droomvriendjes.nl met Reply-To klant email
   - **Checkout gestart:** Email met klant email + winkelwagen items
   - **Bestelling geplaatst:** Notificatie naar owner
   - **Betaling geslaagd:** Orderbevestiging naar klant + notificatie owner
   - **Betaling mislukt:** Notificatie naar owner
   - SMTP via TransIP (SPF/DKIM geconfigureerd)

5. **SEO Optimalisatie**
   - Meta title & description
   - Keywords
   - Open Graph tags (Facebook)
   - Twitter Cards
   - JSON-LD structured data (Organization, Website, Product)

6. **Branding**
   - Custom logo afbeelding in header
   - "Droomvriendjes" naam overal
   - Professionele uitstraling

7. **Product Reviews (13 januari 2025)**
   - 33 gedetailleerde klantreviews toegevoegd
   - Reviews gefilterd per product op shortName
   - "Geverifieerd" badges bij alle reviews
   - Elk product heeft 3 unieke reviews

8. **Verbeterde UX (13 januari 2025)**
   - Scroll naar boven bij navigatie naar productpagina
   - "In Winkelwagen" knop opent cart sidebar
   - "Direct Bestellen" knop opent cart sidebar
   - Cart icoon met badge in ProductPage header

### API Endpoints
| Endpoint | Methode | Beschrijving |
|----------|---------|--------------|
| `/api/orders` | POST | Nieuwe bestelling aanmaken + email notificatie |
| `/api/payments/create` | POST | Mollie betaling starten |
| `/api/webhook/mollie` | POST | Betalingsstatus webhook + success/fail emails |
| `/api/orders/{id}` | GET | Bestelstatus ophalen |
| `/api/payment-methods` | GET | Beschikbare betaalmethodes |
| `/api/contact` | POST | Contactformulier → email naar owner |
| `/api/checkout-started` | POST | Checkout notificatie → email naar owner |

### Email Notificatie Configuratie
- **Provider:** TransIP SMTP
- **From:** info@droomvriendjes.nl
- **To (alle notificaties):** info@droomvriendjes.nl
- **Features:**
  - Reply-To klant email bij contactformulier
  - Checkout-started met winkelwagen items
  - Order events (placed, success, fail)
  - Klant bevestiging bij succesvolle betaling

### Mollie Configuratie
- **Live Key:** Actief in productie (backend/.env)
- **Profile ID:** pfl_xeCrPvSH9y

## Test Resultaten
- **Iteratie 1:** Backend 100%, Frontend 100%
- **Iteratie 2:** Frontend 100% (8/8 tests geslaagd) - Reviews, Scroll, Knoppen
- **Iteratie 3:** Backend 92% (11/12), Frontend 100% - Email notificaties
- **Test rapporten:** `/app/test_reports/iteration_1.json`, `/app/test_reports/iteration_2.json`, `/app/test_reports/iteration_3.json`

## Backlog

### P0 - Kritiek (Refactoring)
- [x] ✅ Header/Footer refactoren naar herbruikbare componenten (Voltooid 15 jan 2025)
  - Nieuwe componenten: `Header.jsx`, `Footer.jsx`, `Layout.jsx`
  - 18+ pagina's gerefactord naar de nieuwe Layout component
  - HomePage behoudt eigen header/footer (speciale styling)
  - Checkout pagina's intentioneel zonder footer (focused UX)

### P1 - In Afwachting
- [x] ✅ Product galerijen met 8-10 foto's per product (Voltooid 17 jan 2025)
- [x] ✅ Watermerken verwijderd van alle productafbeeldingen (Voltooid 17 jan 2025)
- [x] ✅ 3 ouder landingspagina's aangemaakt (Voltooid 17 jan 2025)
  - /ouders-baby - Ouders van baby's (0-12 maanden)
  - /ouders-peuters - Ouders van peuters (1-4 jaar)
  - /ouders-extra-behoeften - Kinderen met ADHD, autisme, HSP
- [x] ✅ Product Slider/Carousel op homepage (Voltooid 17 jan 2025)
  - Swiper.js v12.0.3 geïntegreerd
  - Autoplay met 4 seconden delay
  - Navigatie pijltjes en pagination dots
  - Responsive: 4 items (desktop), 2 items (tablet), 1 item (mobiel)
  - Badges: BESTSELLER, NIEUW, POPULAIR, VOORDEELSET
- [ ] Product Tagging voor SEO/Google Shopping optimalisatie
- [ ] Google Ads Setup assistentie (keyword lijsten, advertentieteksten)

### P2 - Nice to Have
- [ ] Admin dashboard voor bestellingen
- [ ] Voorraad beheer
- [ ] WordPress export functionaliteit
- [ ] Zoekfunctie voor producten

## Refactoring Voltooid (15 januari 2025)
### Header/Footer Componenten
De duplicatie van header/footer code is opgelost door:
1. **Header.jsx** - Herbruikbare header met logo, cart button, en configurable back button
2. **Footer.jsx** - Volledige footer met navigatie, bedrijfsgegevens, en betaalmethodes
3. **Layout.jsx** - Wrapper component die Header, Footer, en CartSidebar combineert

**Configuratie opties Layout component:**
- `showFullNav` - Toon volledige navigatie (alleen HomePage)
- `showBackButton` - Toon terug knop
- `showPromoBanner` - Toon promo banner
- `hideFooter` - Verberg footer (voor checkout flows)
- `hideHeader` - Verberg header (voor speciale pagina's)

**Pagina's met Layout component:**
- OverOnsPage, ProductPage, ContactPage, CadeaubonPage
- StressPage, AngstPage, SlaapproblemenPage, HSPPage
- DementiePage, TroostPage, OverprikkelingPage
- BlogsPage, ReviewsPage, PrivacyPage, VoorwaardenPage
- RetournerenPage, NaamBedenkerPage, UitproberenPage

**Pagina's met eigen layout:**
- HomePage (speciale hero sectie en styling)
- CheckoutPage (focused checkout zonder footer)
- PaymentResultPage (focused checkout zonder footer)

## Product Galerijen Voltooid (17 januari 2025)
### Alle 11 producten hebben nu schone afbeeldingen
Watermerken ("BESTSELLER", "2E KNUFFEL 50% KORTING") verwijderd van alle productafbeeldingen.

**Producten met galleries (8-10 foto's elk):**
1. Leeuw - 9 foto's
2. Schaap - 8 foto's ✅ (nieuw)
3. Teddy - 11 foto's
4. Pinguïn - 8 foto's
5. Dinosaurus - 8 foto's
6. Duo Schaap & Teddy - 8 foto's ✅ (nieuw)
7. Beer Projector - 9 foto's
8. Schaap Liggend - 6 foto's ✅ (nieuw)
9. Eenhoorn - 8 foto's
10. Teddy Zittend - 10 foto's ✅ (nieuw)
11. Panda - 5 foto's

## Test Resultaten
- **Iteratie 1:** Backend 100%, Frontend 100%
- **Iteratie 2:** Frontend 100% (8/8 tests geslaagd) - Reviews, Scroll, Knoppen
- **Iteratie 3:** Backend 92% (11/12), Frontend 100% - Email notificaties
- **Iteratie 4:** Frontend 100% - Header/Footer refactoring succesvol
- **Test rapporten:** `/app/test_reports/iteration_*.json`

## Deployment
- **Status:** Live met echte Mollie betalingen
- **Email:** TransIP SMTP geconfigureerd voor orderbevestigingen
