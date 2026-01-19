# Droomvriendjes - Product Requirements Document

## Latest Updates (January 19, 2026)
- **Footer Links Fixed**: Created new `/rustmoment-ouders` page (RustmomentOudersPage.jsx) to make all footer links clickable
- **Route Added**: Added route in App.js for the new page

## Project Overview
E-commerce website for Droomvriendjes selling plush sleep toys with night lights and soothing sounds.

**Tech Stack:** React + FastAPI + MongoDB Atlas
**Live URL:** https://dreamy-plush.preview.emergentagent.com

---

## What's Been Implemented (January 2025)

### Core E-commerce
- ✅ Product catalog with 13 products
- ✅ Shopping cart functionality
- ✅ Mollie payment integration (LIVE)
- ✅ Order management system
- ✅ Gift card system (test code: DV-TEST0001)

### Admin Dashboard
- ✅ Password-protected admin panel (/admin)
- ✅ Revenue, orders, and customer statistics
- ✅ Conversion funnel analysis
- ✅ Date-range filters (7, 30, 90 days)
- ✅ Top products and abandoned cart tracking

### Product Management (This Session)
- ✅ Out-of-stock functionality (products 2 & 3 marked as UITVERKOCHT)
- ✅ Out-of-stock products moved to end of product list
- ✅ Out-of-stock products hidden from all landing pages
- ✅ Product pages block checkout for out-of-stock items
- ✅ Bestseller badges updated: #1 Beer (7), #2 Panda (11), #3 Baby Slaapmaatje Schaap (12)

### Landing Pages Updated
- ✅ All landing pages now use products 7, 11, 12 (in-stock only)
- ✅ Unified Footer component across all pages (purple theme)
- ✅ NEW: /tips-bedtijd page added

### Deployment Fixes (This Session)
- ✅ Fixed `load_dotenv(override=True)` → `override=False` for Kubernetes
- ✅ Removed hardcoded admin password fallback
- ✅ Optimized MongoDB queries with projections and filters
- ✅ Updated ">10.000+" customer count text

---

## Pages Updated This Session
| Page | Changes |
|------|---------|
| HomePage.jsx | Bestseller section: Beer #1, Panda #2, Slaapmaatje #12. Product slider filters out-of-stock. |
| KnuffelsPage.jsx | Out-of-stock products sorted to end |
| ProductPage.jsx | Disabled checkout for out-of-stock products |
| NaamBedenkerPage.jsx | Products: 7, 11, 12 + Unified Footer |
| VrouwenLandingPage.jsx | Products: 7, 11, 12 + Unified Footer |
| OudersBabyPage.jsx | Products: 7, 11, 12 + Unified Footer |
| OudersPeutersPage.jsx | Products: 7, 11, 12 + Unified Footer |
| OudersExtraBehoeftenPage.jsx | Products: 7, 11, 12 + Unified Footer |
| StressPage.jsx | Products: 7, 11, 12 |
| HSPPage.jsx | Products: 7, 11, 12 |
| AngstPage.jsx | Products: 7, 11, 12 |
| SlaapproblemenPage.jsx | Products: 7, 11, 12 |
| TroostPage.jsx | Products: 7, 11, 12 |
| OverprikkelingPage.jsx | Products: 7, 11, 12 |
| DementiePage.jsx | Products: 7, 11, 12 |
| TipsBedtijdPage.jsx | NEW - Complete bedtime tips page |

---

## Remaining Tasks (Backlog)

### P0 - High Priority
- [ ] Verify cadeaubon flow with test code DV-TEST0001
- [ ] Complete Sendcloud integration testing
- [ ] Production deployment

### P1 - Medium Priority
- [ ] Google Ads BOOST campaign creation (requires re-authentication)
- [ ] Undefined image URLs need clarification from user
- [ ] Admin panel for discount code management

### P2 - Future Enhancements
- [ ] Abandoned cart email sequences
- [ ] Calendar date range picker for dashboard
- [ ] Migrate products from mockData.js to MongoDB
- [ ] Refactor server.py into smaller route files

---

## Credentials
- **Admin Login:** admin / Droomvriendjes2024!
- **Test Gift Card:** DV-TEST0001 (€0.01)

## 3rd Party Integrations
| Service | Status |
|---------|--------|
| Mollie Payments | ✅ LIVE |
| MongoDB Atlas | ✅ LIVE |
| Sendcloud | ⚠️ Integrated, needs testing |
| Google Ads API | ⚠️ Connected, campaign creation pending |
| Google Merchant Center | ✅ Working |
