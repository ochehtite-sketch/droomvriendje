import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, reviews, benefits, features, testimonials, videos, faqs } from '../mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ShoppingCart, Moon, Heart, Sparkles, Monitor, ShieldCheck, Truck, Award, Play } from 'lucide-react';

const HomePage = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Moon className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-900">OujiKidz</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#producten" className="text-gray-700 hover:text-purple-600 transition-colors">Producten</a>
              <a href="#voordelen" className="text-gray-700 hover:text-purple-600 transition-colors">Voordelen</a>
              <a href="#reviews" className="text-gray-700 hover:text-purple-600 transition-colors">Reviews</a>
              <a href="#faq" className="text-gray-700 hover:text-purple-600 transition-colors">FAQ</a>
            </nav>
            <Button variant="outline" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 text-center">
        <p className="text-sm md:text-base font-semibold">🎁 ACTIE: 2 KOPEN = 3E GRATIS! 🎁</p>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/30 to-pink-100/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6 leading-tight">
              Een Betere Nachtrust<br />Voor Jouw Kind
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Kalmerende knuffels met licht & muziek die helpen bij ontspanning en beter slapen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                <a href="#producten">Ontdek Onze Knuffels</a>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold">4.5/5.0 uit 500+ reviews</span>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>30 dagen geld-terug</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Gratis verzending</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>CE gecertificeerd</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="voordelen" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            Waarom OujiKidz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Verbeterde Nachtrust</h3>
                <p className="text-gray-600">86% van de kinderen valt sneller in slaap en slaapt beter door</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Minder Stress & Angst</h3>
                <p className="text-gray-600">Helpt kinderen ontspannen en zich veilig te voelen</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-pink-100 hover:border-pink-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Rustgevend & Kalmerend</h3>
                <p className="text-gray-600">Zachte lichten en muziek voor optimale ontspanning</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Minder Schermtijd</h3>
                <p className="text-gray-600">Een gezond schermvrij alternatief voor het slapengaan</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="producten" className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              Onze Kalmerende Knuffels
            </h2>
            <p className="text-xl text-gray-600">2 KOPEN = 3E GRATIS! 🎁</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300 group">
                <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 p-8">
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
                      {product.badge}
                    </Badge>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-purple-900">{product.shortName}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="space-y-2 mb-4">
                    {product.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="text-sm text-gray-700">{benefit}</div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-purple-900">€{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link to={`/product/${product.id}`}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Meer Informatie
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      In Winkelwagen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            Zie OujiKidz In Actie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videos.map((video) => (
              <div key={video.id} className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <div className="aspect-[9/16]">
                  <iframe
                    src={video.url.replace('shorts/', 'embed/')}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            Wat Ouders Zeggen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-2 border-purple-100 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-purple-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              Vertrouwd Door 1000+ Gezinnen
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl font-bold">4.5/5.0</span>
            </div>
            <p className="text-gray-600">Gebaseerd op 500+ verified reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <Card key={review.id} className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    {review.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        ✓ Geverifieerd
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-bold text-purple-900 mb-2">{review.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{review.text}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">{review.name}</span>
                    <span className="text-gray-500">{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  {feature.icon === 'ShieldCheck' && <ShieldCheck className="w-8 h-8 text-green-600" />}
                  {feature.icon === 'Truck' && <Truck className="w-8 h-8 text-blue-600" />}
                  {feature.icon === 'Award' && <Award className="w-8 h-8 text-purple-600" />}
                  {feature.icon === 'Star' && <Star className="w-8 h-8 text-yellow-400" />}
                </div>
                <h3 className="font-bold text-purple-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            Veelgestelde Vragen
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-purple-50 border-2 border-purple-100 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-purple-900 hover:text-purple-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar Voor Betere Nachten?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Sluit je aan bij 1000+ tevreden ouders. 2 KOPEN = 3E GRATIS!
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
            <a href="#producten">Bestel Nu Met Korting</a>
          </Button>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
            <span>✓ Gratis verzending</span>
            <span>✓ 30 dagen retour</span>
            <span>✓ Klarna beschikbaar</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Moon className="w-8 h-8" />
                <span className="text-2xl font-bold">OujiKidz</span>
              </div>
              <p className="text-purple-200">Kalmerende knuffels voor een betere nachtrust</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#producten" className="hover:text-white transition-colors">Alle Producten</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Acties</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Klantenservice</h3>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Verzending & Retour</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Betaalmethoden</h3>
              <div className="text-purple-200">
                <p>iDEAL • Klarna</p>
                <p>PayPal • Creditcard</p>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-800 pt-8 text-center text-purple-200">
            <p>&copy; 2025 OujiKidz. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
