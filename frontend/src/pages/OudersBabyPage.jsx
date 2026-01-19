import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Heart, Moon, Star, CheckCircle, ArrowRight, Users, Shield, Baby, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';
import Layout from '../components/Layout';

const OudersBabyPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Select specific products for babies
  const selectedProductIds = [1, 2, 7];
  const landingProducts = allProducts.filter(p => selectedProductIds.includes(p.id));

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <Layout>
      <CartSidebar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Voor Ouders van Baby's (0-12 maanden)
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4">
            Help Je Baby Rustig Slapen
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek de slaapknuffel die duizenden baby's (en hun ouders) helpt om beter te slapen
          </p>
        </div>

        {/* Problem Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">Herken je dit?</h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600">•</span>
                <span>Je baby wordt meerdere keren per nacht wakker</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600">•</span>
                <span>Inslapen duurt eindeloos lang, zelfs met wiegen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600">•</span>
                <span>Je baby is overprikkeld en komt moeilijk tot rust</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600">•</span>
                <span>Jij en je partner zijn uitgeput van de slapeloze nachten</span>
              </li>
            </ul>
            <p className="mt-6 font-semibold text-gray-800">
              Je bent niet alleen. En er is een zachte, veilige oplossing.
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            Waarom Droomvriendjes Werkt voor Baby's
          </h2>
          <p className="text-gray-700 mb-6">
            Onze slaapknuffels zijn speciaal ontwikkeld met elementen die wetenschappelijk bewezen zijn om baby's te helpen ontspannen:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border-2 border-blue-100 text-center">
              <Moon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Zacht Nachtlicht</h3>
              <p className="text-sm text-gray-600">Geen fel licht dat de melatonine verstoort, maar een zachte gloed</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-purple-100 text-center">
              <Sparkles className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">White Noise</h3>
              <p className="text-sm text-gray-600">Lijkt op de geluiden in de baarmoeder - instant herkenbaar voor je baby</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-pink-100 text-center">
              <Heart className="w-10 h-10 text-pink-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Zachte Knuffel</h3>
              <p className="text-sm text-gray-600">Geeft je baby een veilig, geborgen gevoel</p>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            100% Veilig voor Je Baby
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-green-100">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">CE-gecertificeerd</span>
                  <span className="text-gray-600"> - Voldoet aan alle Europese veiligheidsnormen</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Geschikt vanaf 0 maanden</span>
                  <span className="text-gray-600"> - Geen kleine onderdelen, veilige materialen</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Wasbaar</span>
                  <span className="text-gray-600"> - De buitenkant is eenvoudig schoon te maken</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Timer functie</span>
                  <span className="text-gray-600"> - Schakelt automatisch uit na 15/30/60 minuten</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Ontwikkeld door ouders</span>
                  <span className="text-gray-600"> - Wij weten precies waar je op let</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            Populair bij Ouders van Baby's
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {landingProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">€{product.price}</span>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Bestellen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Baby className="w-12 h-12 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-gray-700 italic mb-4">
                  "Onze dochter van 4 maanden sliep nooit langer dan 2 uur achter elkaar. Na een week met de Droomvriendjes slaapt ze nu 5-6 uur! Wij zijn zo dankbaar."
                </p>
                <p className="font-semibold text-gray-900">- Lisa, moeder van Emma (4 maanden)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-xl p-4 border-2 border-purple-100">
              <p className="text-3xl font-bold text-purple-600">86%</p>
              <p className="text-sm text-gray-600">slaapt beter</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
              <p className="text-3xl font-bold text-blue-600">1000+</p>
              <p className="text-sm text-gray-600">tevreden gezinnen</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-green-100">
              <p className="text-3xl font-bold text-green-600">4.8★</p>
              <p className="text-sm text-gray-600">gemiddelde score</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <Shield className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Probeer Het Risico-vrij</h2>
          <p className="text-lg mb-6 opacity-90">
            14 dagen niet tevreden? Geld terug, geen vragen gesteld.
          </p>
          <Link to="/knuffels">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8">
              Bekijk Alle Slaapknuffels
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm mt-6 opacity-80">
            Gratis verzending vanaf €35 | Veilig betalen met iDEAL
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default OudersBabyPage;
