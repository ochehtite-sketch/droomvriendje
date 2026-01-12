import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
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
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
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
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
