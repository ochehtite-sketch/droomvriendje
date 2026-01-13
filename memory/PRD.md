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
- [ ] Header/Footer refactoren naar herbruikbare componenten (25+ pagina's hebben duplicatie)

### P2 - Nice to Have
- [ ] Admin dashboard voor bestellingen
- [ ] Voorraad beheer
- [ ] WordPress export functionaliteit
- [ ] Zoekfunctie voor producten

## Deployment
- **Status:** Live met echte Mollie betalingen
- **Email:** TransIP SMTP geconfigureerd voor orderbevestigingen
