import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Heart, Moon, Star, CheckCircle, ArrowRight, Users, Shield, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';
import Layout from '../components/Layout';

const VrouwenLandingPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Select specific products for this landing page
  const selectedProductIds = [7, 11, 2];
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
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            Speciaal voor Vrouwen 60+
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4">
            Eindelijk Weer Rustig Slapen
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek hoe duizenden vrouwen beter slapen met onze rustgevende slaapknuffels
          </p>
        </div>

        {/* Problem Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">Herken je dit?</h2>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600">•</span>
                <span>Je ligt 's nachts wakker door opvliegers of zorgen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600">•</span>
                <span>Je gedachten blijven maar malen als je probeert te slapen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600">•</span>
                <span>De nachten voelen lang en soms eenzaam</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600">•</span>
                <span>Slaappillen wil je liever niet gebruiken</span>
              </li>
            </ul>
            <p className="mt-6 font-semibold text-gray-800">
              Wij begrijpen het. En we hebben een zachte, natuurlijke oplossing.
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            De Kracht van Droomvriendjes
          </h2>
          <p className="text-gray-700 mb-6">
            Onze slaapknuffels zijn niet alleen voor kinderen. Steeds meer vrouwen ontdekken de rustgevende werking van:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border-2 border-purple-100 text-center">
              <Moon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Zacht Nachtlicht</h3>
              <p className="text-sm text-gray-600">Geen fel licht, maar een zachte, geruststellende gloed</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-blue-100 text-center">
              <Sparkles className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Kalmerende Geluiden</h3>
              <p className="text-sm text-gray-600">White noise en natuurgeluiden voor diepe ontspanning</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-pink-100 text-center">
              <Heart className="w-10 h-10 text-pink-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Troostend Gevoel</h3>
              <p className="text-sm text-gray-600">Iets zachts om vast te houden in de nacht</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            Waarom Vrouwen Kiezen voor Droomvriendjes
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-purple-100">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Natuurlijke slaaphulp</span>
                  <span className="text-gray-600"> - Geen medicijnen, geen bijwerkingen</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Helpt bij opvliegers</span>
                  <span className="text-gray-600"> - De zachte geluiden leiden af van ongemak</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Stopt piekeren</span>
                  <span className="text-gray-600"> - Focus op het licht en geluid, niet op zorgen</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Subtiel design</span>
                  <span className="text-gray-600"> - Ziet er niet kinderachtig uit</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">14 dagen proberen</span>
                  <span className="text-gray-600"> - Niet tevreden? Geld terug, geen vragen</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            Onze Favorieten voor Vrouwen 60+
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {landingProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-50 to-blue-50 p-4">
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

        {/* Social Proof */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 text-center">
            <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-900 mb-2">
              Al meer dan 1.000 tevreden klanten
            </p>
            <p className="text-gray-600">
              Inclusief honderden vrouwen die eindelijk weer rustig slapen
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <Shield className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Probeer Het Zelf</h2>
          <p className="text-lg mb-6 opacity-90">
            14 dagen niet goed, geld terug. Zonder gedoe.
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

export default VrouwenLandingPage;
