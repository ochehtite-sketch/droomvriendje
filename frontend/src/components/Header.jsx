import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Header Component - Herbruikbare header voor alle pagina's
 * 
 * @param {boolean} showFullNav - Toon volledige navigatie (alleen voor HomePage)
 * @param {boolean} showBackButton - Toon "Terug" knop
 * @param {string} backButtonText - Tekst voor de terug knop
 * @param {string} backButtonLink - Link voor de terug knop
 */
const Header = ({ 
  showFullNav = false, 
  showBackButton = true,
  backButtonText = "Terug naar Home",
  backButtonLink = "/"
}) => {
  const { getItemCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28 md:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_plush-revamp/artifacts/npuc23bl_lgoo%20ads%20%281%29.png" 
              alt="Droomvriendjes.nl - Voor een zachte nachtrust" 
              className="h-24 md:h-28 w-auto"
            />
          </Link>

          {/* Full Navigation (only for HomePage) */}
          {showFullNav && (
            <nav className="hidden md:flex space-x-8">
              <a href="#producten" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Knuffels
              </a>
              <Link to="/cadeaubon" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Cadeaubonnen
              </Link>
              <Link to="/over-ons" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Over Droomvriendjes
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Contact
              </Link>
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Shopping Cart Button */}
            <Button 
              variant="outline" 
              className="relative" 
              onClick={() => setIsCartOpen(true)}
              data-testid="header-cart-button"
            >
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getItemCount()}
                </span>
              )}
            </Button>

            {/* Back Button (not on HomePage) */}
            {showBackButton && (
              <Link to={backButtonLink}>
                <Button variant="outline" data-testid="header-back-button">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {backButtonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
