import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, CreditCard, Lock, Check, Truck, Heart, ArrowLeft, Loader2, Plus, Minus, Trash2, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackBeginCheckout, trackAddPaymentInfo, trackAddShippingInfo } from '../utils/analytics';
import { products } from '../mockData';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getSubtotal, getDiscount, getTotal, updateQuantity, removeFromCart, clearCart, addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const trackingTimeoutRef = useRef(null);
  const hasTrackedRef = useRef(false);
  const [addedProducts, setAddedProducts] = useState({});
  const crossSellRef = useRef(null);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    comment: '',
    paymentMethod: 'ideal'
  });

  // GA4: Track begin_checkout when page loads
  useEffect(() => {
    if (cart.length > 0) {
      trackBeginCheckout(cart);
    }
  }, []);

  // Load saved email from cart sidebar
  useEffect(() => {
    const savedEmail = localStorage.getItem('droomvriendjes_checkout_email');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (trackingTimeoutRef.current) {
        clearTimeout(trackingTimeoutRef.current);
      }
    };
  }, []);

  // Track checkout session for abandoned cart recovery
  const trackCheckoutSession = async (email, name) => {
    if (!email || cart.length === 0) return;
    
    try {
      await fetch(`${API_URL}/api/email/track-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: name || '',
          items: cart.map(item => ({
            product_id: String(item.id),
            name: item.shortName || item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          total: getTotal()
        })
      });
      hasTrackedRef.current = true;
    } catch (error) {
      console.error('Error tracking checkout session:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Track checkout session when email is entered (debounced)
    if (name === 'email' && value.includes('@') && value.includes('.')) {
      if (trackingTimeoutRef.current) {
        clearTimeout(trackingTimeoutRef.current);
      }
      trackingTimeoutRef.current = setTimeout(() => {
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        trackCheckoutSession(value, fullName);
      }, 2000);
    }
  };

  const handlePaymentMethodChange = (value) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
    trackAddPaymentInfo(cart, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName || 
        !formData.address || !formData.zipCode || !formData.city) {
      setError('Vul alle verplichte velden in');
      return;
    }

    if (cart.length === 0) {
      setError('Je winkelwagen is leeg');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Track shipping info for GA4
      trackAddShippingInfo(cart, 'standard_shipping');
      
      // Notify backend of checkout start
      await fetch(`${API_URL}/api/checkout-started`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          items: cart
        })
      }).catch(() => {});
      
      // Create order
      const orderResponse = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_email: formData.email,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_phone: formData.phone || '',
          customer_address: formData.address,
          customer_city: formData.city,
          customer_zipcode: formData.zipCode,
          customer_comment: formData.comment || '',
          items: cart.map(item => ({
            product_id: String(item.id),
            product_name: item.shortName || item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          subtotal: getSubtotal(),
          discount: getDiscount(),
          total_amount: getTotal()
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Order kon niet worden aangemaakt');
      }

      const orderData = await orderResponse.json();

      // Create payment via backend (SECURE - no API key in frontend!)
      const paymentResponse = await fetch(`${API_URL}/api/payments/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderData.order_id,
          payment_method: formData.paymentMethod
        })
      });

      if (!paymentResponse.ok) {
        const errData = await paymentResponse.json();
        throw new Error(errData.detail || 'Betaling kon niet worden gestart');
      }

      const paymentData = await paymentResponse.json();

      if (paymentData.checkout_url) {
        clearCart();
        window.location.href = paymentData.checkout_url;
      } else {
        throw new Error('Geen checkout URL ontvangen');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Er is iets misgegaan. Probeer het opnieuw.');
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    { value: 'ideal', label: 'iDEAL', icon: '🏦', popular: true, description: 'Direct via je bank' },
    { value: 'creditcard', label: 'Creditcard', icon: '💳', description: 'Visa, Mastercard, Amex' },
    { value: 'in3', label: 'iDEAL in3', icon: '3️⃣', description: 'Betaal in 3 termijnen' },
    { value: 'applepay', label: 'Apple Pay', icon: '🍎', description: 'Snel & veilig' },
    { value: 'bancontact', label: 'Bancontact', icon: '🇧🇪', description: 'Voor België' },
  ];

  // Empty cart view
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-warm-brown-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-warm-brown-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Je winkelwagen is leeg</h2>
          <p className="text-slate-600 mb-6">Voeg eerst producten toe aan je winkelwagen.</p>
          <Link to="/">
            <button className="bg-warm-brown-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-warm-brown-600 transition flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-5 h-5" />
              Terug naar shop
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <img 
              src="/logo.svg" 
              alt="Droomvriendjes" 
              className="h-20 md:h-24 w-auto mx-auto"
            />
          </Link>
          <p className="text-slate-600 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Veilig afrekenen
          </p>
        </div>

        {/* Back link */}
        <Link to="/" className="inline-flex items-center text-warm-brown-600 hover:text-warm-brown-700 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar shop
        </Link>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-warm-brown-500" />
                  Contactgegevens
                </h2>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mailadres *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-warm-brown-500 focus:outline-none transition"
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-warm-brown-500" />
                  Verzendadres
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Voornaam *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="p-3 border-2 border-slate-200 rounded-xl focus:border-warm-brown-500 focus:outline-none transition"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Achternaam *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="p-3 border-2 border-slate-200 rounded-xl focus:border-warm-brown-500 focus:outline-none transition"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Adres + huisnummer *"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="md:col-span-2 p-3 border-2 border-slate-200 rounded-xl focus:border-warm-brown-500 focus:outline-none transition"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Postcode *"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="p-3 border-2 border-slate-200 rounded-xl focus:border-warm-brown-500 focus:outline-none transition"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Plaats *"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="p-3 border-2 border-slate-200 rounded-xl focus:border-warm-brown-500 focus:outline-none transition"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefoonnummer (optioneel)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="md:col-span-2 p-3 border-2 border-slate-200 rounded-xl focus:border-warm-brown-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Comments/Special Requests */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-warm-brown-500" />
                  Opmerkingen
                </h2>
                <textarea
                  name="comment"
                  placeholder="Heb je een speciale wens of opmerking? (bijvoorbeeld: cadeauverpakking, bezorgmoment, persoonlijk bericht)"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-warm-brown-500 focus:outline-none resize-none transition"
                />
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-warm-brown-400" />
                  Optioneel - We doen ons best om aan je wensen te voldoen!
                </p>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-warm-brown-500" />
                  Betaalmethode
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {paymentMethods.map(method => (
                    <label 
                      key={method.value} 
                      className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer hover:border-warm-brown-400 transition ${
                        formData.paymentMethod === method.value 
                          ? 'border-warm-brown-500 bg-warm-brown-50 shadow-md' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {method.popular && (
                        <span className="absolute -top-2 -right-2 bg-warm-brown-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                          Populair
                        </span>
                      )}
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={() => handlePaymentMethodChange(method.value)}
                        className="sr-only"
                      />
                      <span className="text-3xl mb-1">{method.icon}</span>
                      <span className="font-semibold text-slate-700 text-sm">{method.label}</span>
                      <span className="text-xs text-slate-500 text-center mt-1">{method.description}</span>
                    </label>
                  ))}
                </div>
                
                {/* Payment Security Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600 bg-green-50 p-3 rounded-xl">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Veilige betaling via Mollie - SSL versleuteld</span>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-warm-brown-500" />
                  Besteloverzicht
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-slate-100">
                      <img 
                        src={item.image} 
                        alt={item.shortName || item.name}
                        className="w-16 h-16 object-cover rounded-xl bg-warm-brown-50"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 text-sm truncate">{item.shortName || item.name}</h3>
                        <p className="text-warm-brown-600 font-bold">€{item.price.toFixed(2).replace('.', ',')}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotaal</span>
                    <span className="font-semibold">€{getSubtotal().toFixed(2).replace('.', ',')}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Korting (2e 50%)</span>
                      <span className="font-semibold">-€{getDiscount().toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Verzending</span>
                    <span className="font-semibold text-green-600">GRATIS</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl font-bold mb-6 pt-4 border-t-2 border-warm-brown-100">
                  <span>Totaal</span>
                  <span className="text-warm-brown-600">€{getTotal().toFixed(2).replace('.', ',')}</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-warm-brown-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-warm-brown-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  data-testid="checkout-submit-button"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verwerken...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Veilig betalen €{getTotal().toFixed(2).replace('.', ',')}
                    </>
                  )}
                </button>

                {/* Trust indicators */}
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-warm-brown-400" />
                    Met liefde gemaakt
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-warm-brown-500" />
                    1-2 werkdagen
                  </span>
                </div>

                {/* Terms */}
                <p className="text-center text-xs text-slate-500 mt-4">
                  Door te bestellen ga je akkoord met onze{' '}
                  <Link to="/voorwaarden" className="text-warm-brown-600 underline hover:text-warm-brown-700">
                    algemene voorwaarden
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Trust Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-warm-brown-50 rounded-full flex items-center justify-center mb-3">
                <Lock className="w-7 h-7 text-warm-brown-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Veilig betalen</h3>
              <p className="text-sm text-slate-600">SSL versleutelde verbinding</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-warm-brown-50 rounded-full flex items-center justify-center mb-3">
                <Truck className="w-7 h-7 text-warm-brown-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Snelle levering</h3>
              <p className="text-sm text-slate-600">Gratis verzending in heel NL</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-warm-brown-50 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-7 h-7 text-warm-brown-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">14 dagen retour</h3>
              <p className="text-sm text-slate-600">Niet tevreden? Geld terug!</p>
            </div>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <span className="text-sm text-slate-500">Betaal veilig met:</span>
          <img src="https://www.mollie.com/external/icons/payment-methods/ideal.svg" alt="iDEAL" className="h-8" />
          <img src="https://www.mollie.com/external/icons/payment-methods/creditcard.svg" alt="Creditcard" className="h-8" />
          <img src="https://www.mollie.com/external/icons/payment-methods/paypal.svg" alt="PayPal" className="h-8" />
          <img src="https://www.mollie.com/external/icons/payment-methods/klarna.svg" alt="Klarna" className="h-8" />
          <img src="https://www.mollie.com/external/icons/payment-methods/applepay.svg" alt="Apple Pay" className="h-8" />
          <img src="https://www.mollie.com/external/icons/payment-methods/bancontact.svg" alt="Bancontact" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
