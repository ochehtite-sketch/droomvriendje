# Droomvriendjes - Product Requirements Document

## Oorspronkelijke Probleemstelling
Een Nederlandse e-commerce website bouwen voor het merk "Droomvriendjes" - een webshop voor slaapknuffels met nachtlampjes en rustgevende geluiden. De website is geïnspireerd op `lotgenootje.com`.

## Kernvereisten
- **Merk:** Droomvriendjes
- **Producten:** 11 slaapknuffels (Leeuw, Schaap, Teddy, Pinguïn, Dinosaurus, Duo, Beer, Schaap Liggend, Eenhoorn, Teddy Zittend, Panda)
- **Prijzen:** €59,95 per product (Duo set: €89,95)
- **Taal:** Nederlands
- **Betalingen:** Mollie integratie (iDEAL, Creditcard, PayPal, Bancontact)

## Architectuur
```
/app
├── backend/
│   ├── server.py          # FastAPI backend met Mollie integratie
│   ├── .env               # Mollie API keys, MongoDB config
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── context/
    │   │   └── CartContext.jsx    # Winkelwagen state management
    │   ├── pages/
    │   │   ├── HomePage.jsx       # Landingspagina met producten
    │   │   ├── CheckoutPage.jsx   # Checkout formulier
    │   │   ├── PaymentResultPage.jsx  # Betaling resultaat
    │   │   ├── ProductPage.jsx    # Product detail
    │   │   └── ... (20+ andere pagina's)
    │   ├── mockData.js            # Product data
    │   └── App.js                 # Routes
    └── .env
```

## Geïmplementeerde Features

### ✅ Voltooid (Januari 2025)
1. **Frontend Website**
   - Homepage met hero sectie en achtergrondafbeelding
   - 11 producten met afbeeldingen en prijzen
   - Trust badges en Trustpilot styling
   - Responsive design (desktop + mobiel)
   - 20+ statische pagina's (Over Ons, Contact, Privacy, etc.)

2. **Winkelwagen Functionaliteit**
   - Cart context met localStorage persistentie
   - Sidebar winkelwagen met +/- knoppen
   - Totaal berekening
   - "Afrekenen" knop

3. **Mollie Betalingen**
   - Order creatie in MongoDB
   - Mollie payment creatie
   - Webhook handling voor status updates
   - Checkout pagina met betaalmethode selectie
   - Betaling resultaat pagina (success/failed)

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

## Backlog

### P0 - Kritiek
- [ ] Test checkout flow met echte iDEAL test betaling
- [ ] E-mail bevestiging na succesvolle betaling

### P1 - Belangrijk
- [ ] Header/Footer refactoren naar herbruikbare componenten
- [ ] "-50% op 2e" badges verwijderen indien niet meer van toepassing
- [ ] Product detail pagina verbeteren

### P2 - Nice to Have
- [ ] Admin dashboard voor bestellingen
- [ ] Voorraad beheer
- [ ] WordPress export functionaliteit
- [ ] Zoekfunctie voor producten

## Technische Stack
- **Frontend:** React, TailwindCSS, shadcn/ui
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Betalingen:** Mollie API
- **Hosting:** Emergent Platform
