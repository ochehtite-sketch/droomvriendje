import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Gift, Heart, Star, Check, Loader2, CreditCard } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const CadeaubonPage = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    ontvanger: '',
    email: '',
    boodschap: '',
    verzender: '',
    verzenderEmail: ''
  });

  const amounts = [25, 50, 75, 100];

  const getFinalAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const amount = getFinalAmount();
    if (amount < 10) {
      setError('Minimaal bedrag is €10');
      setIsLoading(false);
      return;
    }

    try {
      // Use the dedicated gift card purchase endpoint
      const response = await fetch(`${API_URL}/api/gift-card/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          sender_name: formData.verzender,
          sender_email: formData.verzenderEmail,
          recipient_name: formData.ontvanger,
          recipient_email: formData.email,
          message: formData.boodschap
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Betaling aanmaken mislukt');
      }

      if (data.checkout_url) {
        // Redirect to Mollie checkout
        window.location.href = data.checkout_url;
      } else {
        throw new Error('Geen checkout URL ontvangen');
      }

    } catch (err) {
      console.error('Gift card purchase error:', err);
      setError(err.message || 'Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <Link to="/" className="flex items-center overflow-hidden">
              <img 
                src="https://customer-assets.emergentagent.com/job_plushfriends/artifacts/v0amam8x_Gemini_Generated_Image_9zlx539zlx539zlx.png" 
                alt="Droomvriendjes - Voor een zachte nachtrust" 
                className="h-20 md:h-24 w-auto scale-150 origin-center"
              />
            </Link>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Droomvriendjes Cadeaubon</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Het perfecte cadeau voor betere nachten en meer rust
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Benefits */}
          <div>
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Waarom een Droomvriendjes Cadeaubon?</h2>
            <div className="space-y-6">
              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gift className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900 mb-2">Betekenisvol Cadeau</h3>
                      <p className="text-gray-600">Geef het cadeau van rust en betere nachtrust. Perfect voor nieuwe ouders, verjaardagen of gewoon omdat het kan!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900 mb-2">Vrije Keuze</h3>
                      <p className="text-gray-600">De ontvanger kan zelf kiezen uit al onze kalmerende knuffels en producten. Iedereen krijgt wat hij of zij echt wil!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-100">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900 mb-2">Direct Verzonden</h3>
                      <p className="text-gray-600">Na betaling wordt de cadeaubon direct per email verstuurd naar de ontvanger. Geen wachttijd!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
              <h3 className="font-bold text-purple-900 mb-3">Hoe werkt het?</h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
                  <span>Kies het bedrag en vul de gegevens in</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
                  <span>Betaal veilig via iDEAL, Klarna of creditcard</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
                  <span>De ontvanger krijgt direct de cadeaubon per email</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
                  <span>De ontvanger kan direct shoppen!</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Right: Order Form */}
          <div>
            <Card className="border-2 border-purple-100 sticky top-24">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-purple-900 mb-6">Bestel Je Cadeaubon</h2>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Kies een bedrag</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {amounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount('');
                          }}
                          className={`p-4 rounded-lg border-2 font-bold text-lg transition-all ${
                            selectedAmount === amount && !customAmount
                              ? 'border-purple-600 bg-purple-50 text-purple-900'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          €{amount}
                        </button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Of voer een eigen bedrag in (min. €10)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      className="border-purple-200"
                    />
                  </div>

                  {/* Recipient Info */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Naam ontvanger *</label>
                    <Input
                      required
                      value={formData.ontvanger}
                      onChange={(e) => setFormData({...formData, ontvanger: e.target.value})}
                      placeholder="Voor wie is de cadeaubon?"
                      className="border-purple-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email ontvanger *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@voorbeeld.nl"
                      className="border-purple-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">Hier wordt de cadeaubon naartoe gestuurd</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Persoonlijke boodschap</label>
                    <Textarea
                      value={formData.boodschap}
                      onChange={(e) => setFormData({...formData, boodschap: e.target.value})}
                      placeholder="Schrijf een persoonlijke boodschap..."
                      rows={4}
                      className="border-purple-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Jouw naam *</label>
                    <Input
                      required
                      value={formData.verzender}
                      onChange={(e) => setFormData({...formData, verzender: e.target.value})}
                      placeholder="Van wie is de cadeaubon?"
                      className="border-purple-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Jouw email *</label>
                    <Input
                      type="email"
                      required
                      value={formData.verzenderEmail}
                      onChange={(e) => setFormData({...formData, verzenderEmail: e.target.value})}
                      placeholder="jouw@email.nl"
                      className="border-purple-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">Voor de bevestiging van je betaling</p>
                  </div>

                  {/* Total */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-purple-900">Totaal:</span>
                      <span className="text-3xl font-bold text-purple-900">
                        €{getFinalAmount().toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Bezig met verwerken...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Betalen €{getFinalAmount().toFixed(2).replace('.', ',')}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span>✓ Veilig betalen</span>
                    <span>✓ Direct verzonden</span>
                    <span>✓ 2 jaar geldig</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadeaubonPage;
