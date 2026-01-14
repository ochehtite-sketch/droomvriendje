import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Moon, ArrowLeft, Mail, Phone, MapPin, Clock, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { trackContactFormSubmit } from '../utils/analytics';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
    onderwerp: '',
    bericht: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          page_url: window.location.href
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // GA4: Track contact form submit
        trackContactFormSubmit({
          ...formData,
          page_url: window.location.href
        });
        
        toast({
          title: "✅ Bericht verzonden!",
          description: "We nemen zo snel mogelijk contact met je op.",
        });
        setFormData({
          naam: '',
          email: '',
          telefoon: '',
          onderwerp: '',
          bericht: ''
        });
      } else {
        throw new Error(data.detail || 'Er ging iets mis');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "❌ Fout",
        description: "Er ging iets mis bij het verzenden. Probeer het opnieuw of mail naar info@droomvriendjes.nl",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://customer-assets.emergentagent.com/job_plushfriends/artifacts/v0amam8x_Gemini_Generated_Image_9zlx539zlx539zlx.png" alt="Droomvriendjes" className="h-20 md:h-24 w-auto" />
                
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8 text-center">Contact</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Heb je een vraag of wil je meer informatie? Neem gerust contact met ons op. 
          We helpen je graag!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 border-purple-100">
            <CardContent className="pt-6 text-center">
              <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-purple-900 mb-2">Email</h3>
              <p className="text-gray-600">info@droomvriendjes.nl</p>
              <p className="text-gray-600">support@droomvriendjes.nl</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardContent className="pt-6 text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-purple-900 mb-2">Adres</h3>
              <p className="text-gray-600">SCHAESBERGERWEG 103</p>
              <p className="text-gray-600">6415 AD Heerlen</p>
              <p className="text-sm text-gray-500 italic mt-2">(Dit is geen bezoekadres)</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardContent className="pt-6 text-center">
              <Clock className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="font-bold text-purple-900 mb-2">Openingstijden</h3>
              <p className="text-gray-600">Ma - Vr: 9:00 - 17:00</p>
              <p className="text-gray-600">Za - Zo: Gesloten</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-purple-100">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Stuur ons een bericht</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Naam *</label>
                    <Input 
                      name="naam"
                      value={formData.naam}
                      onChange={handleChange}
                      placeholder="Je volledige naam"
                      required
                      className="border-purple-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="je@email.nl"
                      required
                      className="border-purple-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefoon</label>
                  <Input 
                    name="telefoon"
                    type="tel"
                    value={formData.telefoon}
                    onChange={handleChange}
                    placeholder="06-12345678"
                    className="border-purple-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Onderwerp *</label>
                  <Input 
                    name="onderwerp"
                    value={formData.onderwerp}
                    onChange={handleChange}
                    placeholder="Waar gaat je vraag over?"
                    required
                    className="border-purple-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bericht *</label>
                  <Textarea 
                    name="bericht"
                    value={formData.bericht}
                    onChange={handleChange}
                    placeholder="Je bericht..."
                    required
                    rows={6}
                    className="border-purple-200"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    'Verstuur Bericht'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
            <h3 className="font-bold text-purple-900 mb-3">Bedrijfsgegevens</h3>
            <div className="text-gray-700 space-y-1">
              <p><strong>Bedrijfsnaam:</strong> Droomvriendjes</p>
              <p><strong>KVK-nummer:</strong> 9921083</p>
              <p><strong>Adres:</strong> SCHAESBERGERWEG 103, 6415 AD Heerlen</p>
              <p className="text-sm italic">(Dit is geen bezoekadres)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;