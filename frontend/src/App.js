import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentResultPage from "./pages/PaymentResultPage";
import OverOnsPage from "./pages/OverOnsPage";
import ContactPage from "./pages/ContactPage";
import RetournerenPage from "./pages/RetournerenPage";
import PrivacyPage from "./pages/PrivacyPage";
import VoorwaardenPage from "./pages/VoorwaardenPage";
import BlogsPage from "./pages/BlogsPage";
import CadeaubonPage from "./pages/CadeaubonPage";
import StressPage from "./pages/StressPage";
import OverprikkelingPage from "./pages/OverprikkelingPage";
import AngstPage from "./pages/AngstPage";
import SlaapproblemenPage from "./pages/SlaapproblemenPage";
import TroostPage from "./pages/TroostPage";
import HSPPage from "./pages/HSPPage";
import DementiePage from "./pages/DementiePage";
import ReviewsPage from "./pages/ReviewsPage";
import NaamBedenkerPage from "./pages/NaamBedenkerPage";
import UitproberenPage from "./pages/UitproberenPage";
import VrouwenLandingPage from "./pages/VrouwenLandingPage";
import OudersBabyPage from "./pages/OudersBabyPage";
import OudersPeutersPage from "./pages/OudersPeutersPage";
import OudersExtraBehoeftenPage from "./pages/OudersExtraBehoeftenPage";
import KnuffelsPage from "./pages/KnuffelsPage";
import GoogleAdsPage from "./pages/GoogleAdsPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  // Force correct page title
  useEffect(() => {
    document.title = "Droomvriendjes | Slaapknuffels met Nachtlampje & Rustgevende Geluiden";
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/knuffels" element={<KnuffelsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/betaling-resultaat/:orderId" element={<PaymentResultPage />} />
            <Route path="/over-ons" element={<OverOnsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/retourneren" element={<RetournerenPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/voorwaarden" element={<VoorwaardenPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/cadeaubon" element={<CadeaubonPage />} />
            <Route path="/stress" element={<StressPage />} />
            <Route path="/overprikkeling" element={<OverprikkelingPage />} />
            <Route path="/angst" element={<AngstPage />} />
            <Route path="/slaapproblemen" element={<SlaapproblemenPage />} />
            <Route path="/troost" element={<TroostPage />} />
            <Route path="/hsp" element={<HSPPage />} />
            <Route path="/dementie" element={<DementiePage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/naam-bedenker" element={<NaamBedenkerPage />} />
            <Route path="/uitproberen" element={<UitproberenPage />} />
            <Route path="/vrouwen-60" element={<VrouwenLandingPage />} />
            <Route path="/ouders-baby" element={<OudersBabyPage />} />
            <Route path="/ouders-peuters" element={<OudersPeutersPage />} />
            <Route path="/ouders-extra-behoeften" element={<OudersExtraBehoeftenPage />} />
            <Route path="/admin/google-ads" element={<GoogleAdsPage />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
