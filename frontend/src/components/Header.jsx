import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Header Component - Hoofdnavigatie voor de website
 * Gebruik: <Header />
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { href: "/knuffels", label: "Producten" },
    { href: "/reviews", label: "Reviews" },
    { href: "/over-ons", label: "Over Ons" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-[0_2px_20px_rgba(45,90,61,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
          >
            <img 
              alt="Droomvriendjes.nl" 
              className="h-16 w-auto sm:h-20 md:h-24" 
              src="https://i.imgur.com/IESI44c.png"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className="relative text-gray-700 hover:text-[#2d5a3d] font-medium transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#2d5a3d] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right side: CTA + Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {/* CTA Button */}
            <Link to="/knuffels">
              <button className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a3d] h-11 bg-white border-2 border-[#2d5a3d] text-[#2d5a3d] hover:bg-[#f5f9f5] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(45,90,61,0.2)] rounded-full px-8 overflow-hidden group">
                <span className="relative z-10">Bekijk knuffels</span>
                <ChevronRight className="w-4 h-4 relative z-10" />
                <span className="absolute inset-0 rounded-full bg-[rgba(45,90,61,0.05)] scale-0 group-hover:scale-100 transition-transform duration-500"></span>
              </button>
            </Link>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-[#2d5a3d] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2d5a3d] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Mobile: Cart + Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-[#2d5a3d] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2d5a3d] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#2d5a3d] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden pb-4 space-y-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 text-gray-700 hover:text-[#2d5a3d] font-medium border-b border-gray-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/knuffels"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block mt-4"
          >
            <button className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold h-11 bg-[#2d5a3d] text-white hover:bg-[#234a31] rounded-full px-8 transition-colors">
              Bekijk knuffels
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
