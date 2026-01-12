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
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
