import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from './CartSidebar';

/**
 * Layout Component - Wrapper voor alle pagina's met Header, Footer en CartSidebar
 * 
 * @param {React.ReactNode} children - De inhoud van de pagina
 * @param {boolean} showFullNav - Toon volledige navigatie in header (alleen HomePage)
 * @param {boolean} showBackButton - Toon "Terug" knop in header
 * @param {string} backButtonText - Tekst voor de terug knop
 * @param {string} backButtonLink - Link voor de terug knop
 * @param {boolean} showPromoBanner - Toon promo banner onder header
 * @param {string} promoBannerText - Tekst voor de promo banner
 * @param {boolean} hideFooter - Verberg de footer (voor checkout flows)
 * @param {boolean} hideHeader - Verberg de header (voor speciale pagina's)
 */
const Layout = ({ 
  children, 
  showFullNav = false,
  showBackButton = true,
  backButtonText = "Terug",
  backButtonLink = "/",
  showPromoBanner = false,
  promoBannerText = "WINTER SALE: 2E KNUFFEL 50% KORTING",
  hideFooter = false,
  hideHeader = false,
  bgClassName = "bg-gradient-to-b from-purple-50 via-white to-blue-50"
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${bgClassName}`}>
      {/* Shopping Cart Sidebar - Always available */}
      <CartSidebar />

      {/* Header */}
      {!hideHeader && (
        <Header 
          showFullNav={showFullNav}
          showBackButton={showBackButton}
          backButtonText={backButtonText}
          backButtonLink={backButtonLink}
        />
      )}

      {/* Promo Banner */}
      {showPromoBanner && (
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-4 text-center shadow-lg">
          <p className="text-lg md:text-2xl font-bold tracking-wide">
            {promoBannerText}
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
