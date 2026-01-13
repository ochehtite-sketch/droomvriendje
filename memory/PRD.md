# Droomvriendjes - Product Requirements Document

## Oorspronkelijke Probleemstelling
Een Nederlandse e-commerce website bouwen voor het merk "Droomvriendjes" - een webshop voor slaapknuffels met nachtlampjes en rustgevende geluiden.

## Kernvereisten
- **Merk:** Droomvriendjes
- **Producten:** 11 slaapknuffels (Leeuw, Schaap, Teddy, Pinguïn, Dinosaurus, Duo, Beer, Schaap Liggend, Eenhoorn, Teddy Zittend, Panda)
- **Prijzen:** €59,95 per product (Duo set: €89,95)
- **Taal:** Nederlands
- **Betalingen:** Mollie integratie (iDEAL, Creditcard, PayPal, Bancontact)

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
   - Checkout pagina met klantgegevens formulier
   - Betaalmethode selectie (iDEAL, Creditcard, PayPal, Bancontact)
   - Betaling resultaat pagina

3. **Mollie Betalingen**
   - Order creatie in MongoDB
   - Mollie payment creatie met checkout URL
   - Webhook handling voor status updates

4. **SEO Optimalisatie**
   - Meta title & description
   - Keywords
   - Open Graph tags (Facebook)
   - Twitter Cards
   - JSON-LD structured data (Organization, Website, Product)

5. **Branding**
   - 🧸 Knuffel emoji als logo
   - "Droomvriendjes" naam overal
   - Geen "Emergent" of "OujiKidz" tekst

### API Endpoints
| Endpoint | Methode | Beschrijving |
|----------|---------|--------------|
| `/api/orders` | POST | Nieuwe bestelling aanmaken |
| `/api/payments/create` | POST | Mollie betaling starten |
| `/api/webhook/mollie` | POST | Betalingsstatus webhook |
| `/api/orders/{id}` | GET | Bestelstatus ophalen |
| `/api/payment-methods` | GET | Beschikbare betaalmethodes |

### Mollie Configuratie
- **Test Key:** test_mR4jayPxrJUMFzuBxyh47CjwqUDp9H
- **Live Key:** live_8w8UnwaTeubC9mna4SSq5x4aPz7UpT  
- **Profile ID:** pfl_xeCrPvSH9y

## Test Resultaten
- **Backend:** 100% (11/11 tests geslaagd)
- **Frontend:** 100% (alle UI tests geslaagd)
- **Test rapport:** `/app/test_reports/iteration_1.json`

## Backlog

### P1 - Belangrijk
- [ ] E-mail bevestiging na succesvolle betaling
- [ ] Header/Footer refactoren naar herbruikbare componenten

### P2 - Nice to Have
- [ ] Admin dashboard voor bestellingen
- [ ] Voorraad beheer
- [ ] WordPress export functionaliteit
- [ ] Zoekfunctie voor producten

## Deployment
- **Status:** Klaar voor deployment
- **Domein:** Kan verbonden worden via Mijndomein.nl of andere providers
- **Live betalingen:** Wissel MOLLIE_API_KEY naar live key in backend/.env
