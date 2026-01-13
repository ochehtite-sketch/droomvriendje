import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Moon, ShoppingCart, ArrowLeft, CreditCard, Loader2, Trash2, Plus, Minus } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('ideal');
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create order
      const orderResponse = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_email: formData.email,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_address: formData.address,
          customer_city: formData.city,
          customer_zipcode: formData.zipCode,
          items: cart.map(item => ({
            product_id: String(item.id),
            product_name: item.shortName || item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          total_amount: getTotal()
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Order creation failed');
      }

      const { order_id } = await orderResponse.json();

      // Create payment
      const paymentResponse = await fetch(`${API_URL}/api/payments/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id,
          payment_method: paymentMethod
        })
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.detail || 'Payment creation failed');
      }

      const { checkout_url } = await paymentResponse.json();

      // Clear cart and redirect to Mollie
      clearCart();
      window.location.href = checkout_url;

    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link to="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" 
                alt="Droomvriendjes" 
                className="h-12 md:h-14 w-auto"
              />
            </Link>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Je winkelwagen is leeg</h1>
          <p className="text-gray-600 mb-8">Voeg eerst producten toe aan je winkelwagen.</p>
          <Link to="/">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" 
                alt="Droomvriendjes" 
                className="h-12 md:h-14 w-auto"
              />
            </Link>
            <div className="flex items-center text-sm text-gray-600">
              <CreditCard className="w-4 h-4 mr-2" />
              Veilig betalen met Mollie
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar shop
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Afrekenen</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contactgegevens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mailadres *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jouw@email.nl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Voornaam *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Jan"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Achternaam *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Jansen"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Verzendadres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Straat en huisnummer *</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Hoofdstraat 123"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">Postcode *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="1234 AB"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Plaats *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Amsterdam"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Betaalmethode</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="ideal" id="ideal" />
                      <Label htmlFor="ideal" className="flex-1 cursor-pointer">
                        <span className="font-medium">iDEAL</span>
                        <span className="block text-sm text-gray-500">Betaal direct via je eigen bank</span>
                      </Label>
                      <img src="https://www.mollie.com/external/icons/payment-methods/ideal.svg" alt="iDEAL" className="h-8" />
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="creditcard" id="creditcard" />
                      <Label htmlFor="creditcard" className="flex-1 cursor-pointer">
                        <span className="font-medium">Creditcard</span>
                        <span className="block text-sm text-gray-500">Visa, Mastercard, American Express</span>
                      </Label>
                      <img src="https://www.mollie.com/external/icons/payment-methods/creditcard.svg" alt="Creditcard" className="h-8" />
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <span className="font-medium">PayPal</span>
                        <span className="block text-sm text-gray-500">Betaal met je PayPal account</span>
                      </Label>
                      <img src="https://www.mollie.com/external/icons/payment-methods/paypal.svg" alt="PayPal" className="h-8" />
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="bancontact" id="bancontact" />
                      <Label htmlFor="bancontact" className="flex-1 cursor-pointer">
                        <span className="font-medium">Bancontact</span>
                        <span className="block text-sm text-gray-500">Belgische betaalmethode</span>
                      </Label>
                      <img src="https://www.mollie.com/external/icons/payment-methods/bancontact.svg" alt="Bancontact" className="h-8" />
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Bezig met verwerken...
                  </>
                ) : (
                  <>
                    Betalen €{getTotal().toFixed(2).replace('.', ',')}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Besteloverzicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b">
                    <img
                      src={item.image}
                      alt={item.shortName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.shortName || item.name}</p>
                      <p className="text-sm text-gray-600">€{item.price.toFixed(2).replace('.', ',')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 rounded ml-auto text-red-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="font-medium text-sm">
                      €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotaal</span>
                    <span>€{getTotal().toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Verzending</span>
                    <span>GRATIS</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Totaal</span>
                    <span>€{getTotal().toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Veilig betalen met Mollie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>30 dagen retourrecht</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Gratis verzending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
