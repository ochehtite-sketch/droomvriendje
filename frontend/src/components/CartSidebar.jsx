import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ShoppingCart, X, Plus, Minus, Truck, Loader2, Mail, Tag, Ticket, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackBeginCheckout, trackCheckoutClicked } from '../utils/analytics';
import { products } from '../mockData';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CartSidebar = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getSubtotal, getDiscount, getTotal, getItemCount, isCartOpen, setIsCartOpen, appliedCoupon, setAppliedCoupon, addToCart } = useCart();
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const crossSellRef = useRef(null);
  const [addedProducts, setAddedProducts] = useState({});
  
  // Discount code state
  const [discountCode, setDiscountCode] = useState('');
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState('');

  // Get cross-sell products (exclude items already in cart)
  const cartProductIds = cart.map(item => item.id);
  const crossSellProducts = products
    .filter(p => !cartProductIds.includes(p.id) && p.id !== 6) // Exclude cart items and Duo set
    .slice(0, 5);

  // Handle quick add to cart
  const handleQuickAdd = (product) => {
    addToCart(product);
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    
    // Reset the "added" state after 2 seconds
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Scroll cross-sell strip
  const scrollCrossSell = (direction) => {
    if (crossSellRef.current) {
      const scrollAmount = 150;
      crossSellRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setCodeError('Voer een kortingscode in');
      return;
    }
    
    setIsValidatingCode(true);
    setCodeError('');
    setCodeSuccess('');
    
    try {
      const response = await fetch(`${API_URL}/api/discount/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: discountCode.trim(),
          cart_total: getSubtotal()
        })
      });
      
      const data = await response.json();
      
      if (data.valid) {
        setCodeSuccess(data.message);
        setAppliedCoupon({
          code: data.code,
          type: data.type,
          discount_amount: data.discount_amount
        });
        localStorage.setItem('droomvriendjes_coupon', JSON.stringify({
          code: data.code,
          type: data.type,
          discount_amount: data.discount_amount
        }));
      } else {
        setCodeError(data.message);
        setAppliedCoupon(null);
      }
    } catch (error) {
      console.error('Discount validation error:', error);
      setCodeError('Kon code niet valideren');
    } finally {
      setIsValidatingCode(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountCode('');
    setCodeSuccess('');
    localStorage.removeItem('droomvriendjes_coupon');
  };

  const handleCheckout = async () => {
    // Validate email
    if (!checkoutEmail.trim()) {
      setEmailError('Vul je e-mailadres in');
      return;
    }
    if (!validateEmail(checkoutEmail)) {
      setEmailError('Ongeldig e-mailadres');
      return;
    }
    
    setEmailError('');
    setIsSubmitting(true);
    
    // GA4: Track begin_checkout (CONVERSION EVENT)
    trackBeginCheckout(cart, checkoutEmail);
    trackCheckoutClicked(cart, checkoutEmail);
    
    try {
      // Send checkout started notification
      const cartItems = cart.map(item => ({
        name: item.shortName || item.name,
        price: item.price,
        quantity: item.quantity
      }));
      
      await fetch(`${API_URL}/api/checkout-started`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_email: checkoutEmail,
          cart_items: cartItems,
          total_amount: getFinalTotal(),
          session_id: localStorage.getItem('droomvriendjes_session') || null
        }),
      });
      
      // Store email for checkout page
      localStorage.setItem('droomvriendjes_checkout_email', checkoutEmail);
      
      // Navigate to checkout
      setIsCartOpen(false);
      navigate('/checkout');
      
    } catch (error) {
      console.error('Checkout started error:', error);
      // Still proceed to checkout even if notification fails
      localStorage.setItem('droomvriendjes_checkout_email', checkoutEmail);
      setIsCartOpen(false);
      navigate('/checkout');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate final total with coupon
  const getFinalTotal = () => {
    let total = getTotal(); // Already includes 2e knuffel 50% korting
    if (appliedCoupon) {
      total -= appliedCoupon.discount_amount;
    }
    return Math.max(0, total);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Winkelwagen ({getItemCount()})</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Je winkelwagen is leeg</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <img src={item.image} alt={item.shortName} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.shortName}</h3>
                      <p className="text-purple-600 font-bold">€{item.price.toFixed(2).replace('.', ',')}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 bg-white border rounded hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 bg-white border rounded hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 text-sm hover:underline"
                        >
                          Verwijder
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-3">
              {/* Kortingscode invoerveld */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  Kortingscode invoeren
                </label>
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Bijv. DV-ABC123"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value.toUpperCase());
                        setCodeError('');
                      }}
                      className={`flex-1 ${codeError ? 'border-red-500' : ''}`}
                      data-testid="discount-code-input"
                    />
                    <Button 
                      variant="outline"
                      onClick={handleApplyDiscount}
                      disabled={isValidatingCode}
                      className="px-4"
                    >
                      {isValidatingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Toepassen'}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="w-4 h-4" />
                      <span className="font-medium">{appliedCoupon.code}</span>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Verwijder
                    </button>
                  </div>
                )}
                {codeError && <p className="text-red-500 text-sm">{codeError}</p>}
                {codeSuccess && <p className="text-green-600 text-sm">{codeSuccess}</p>}
              </div>

              {/* Subtotaal */}
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotaal:</span>
                <span>€{getSubtotal().toFixed(2).replace('.', ',')}</span>
              </div>
              
              {/* 2e knuffel korting */}
              {getDiscount() > 0 && (
                <div className="flex justify-between text-green-600 text-sm">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    2e knuffel 50% korting:
                  </span>
                  <span>-€{getDiscount().toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              
              {/* Coupon korting */}
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 text-sm">
                  <span className="flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    Kortingscode ({appliedCoupon.code}):
                  </span>
                  <span>-€{appliedCoupon.discount_amount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              
              {/* Totaal */}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Totaal:</span>
                <span>€{getFinalTotal().toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="text-sm text-green-600 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Gratis verzending!
              </div>
              
              {/* Korting hint */}
              {getDiscount() === 0 && getItemCount() === 1 && (
                <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded-lg flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Voeg nog 1 knuffel toe voor 50% korting!
                </div>
              )}
              
              {/* Email input for checkout */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-mailadres voor bestelling *
                </label>
                <Input
                  type="email"
                  placeholder="je@email.nl"
                  value={checkoutEmail}
                  onChange={(e) => {
                    setCheckoutEmail(e.target.value);
                    setEmailError('');
                  }}
                  className={emailError ? 'border-red-500' : ''}
                  data-testid="checkout-email-input"
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                onClick={handleCheckout}
                disabled={isSubmitting}
                data-testid="checkout-button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Even geduld...
                  </>
                ) : (
                  'Afrekenen'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
