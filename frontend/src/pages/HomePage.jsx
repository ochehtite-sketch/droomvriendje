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
      {/* Trustpilot Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-green-600 text-green-600" />
              ))}
            </div>
            <span className="font-semibold text-gray-800">4.7/5 Uitstekend!</span>
            <span className="text-gray-600">1200+ reviews</span>
            <span className="text-green-600 font-semibold">★★★★★</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Moon className="w-10 h-10 text-purple-600" />
                <span className="text-2xl font-bold text-purple-900">Droomvriendjes</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#producten" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Knuffels</a>
              <Link to="/cadeaubon" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Cadeaubonnen</Link>
              <Link to="/over-ons" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Over Droomvriendjes</Link>
              <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact</Link>
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
        
        {/* Trust Badges Bar */}
        <div className="bg-amber-50 border-t border-amber-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-amber-600 text-xl">✓</span>
                <span className="text-gray-700">Vertrouwd door 100.000+ klanten</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-amber-600 text-xl">✓</span>
                <span className="text-gray-700">Binnen 30 dagen gratis retourneren</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-amber-600 text-xl">✓</span>
                <span className="text-gray-700">Gratis verzending (twv. €5,95)</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-4 text-center shadow-lg">
        <p className="text-lg md:text-2xl font-bold tracking-wide">
          WINTER SALE: 2E KNUFFEL 50% KORTING
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Meer dan alleen een knuffel
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Onze kalmerende knuffels met licht, muziek en projectie helpen bij ontspanning, stress en een betere nachtrust
            </p>
            
            {/* Trustpilot Score */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="flex items-center space-x-1 bg-green-600 px-3 py-2 rounded">
                <Star className="w-5 h-5 fill-white text-white" />
                <span className="text-white font-bold">Trustpilot</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-green-600 text-green-600" />
                ))}
              </div>
              <span className="text-lg font-bold text-gray-900">4.7/5</span>
              <span className="text-gray-600">uit 1200+ beoordelingen</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg shadow-lg">
                <a href="#producten">Bekijk Alle Knuffels</a>
              </Button>
            </div>
          </div>
          
          {/* Trust Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🚚</div>
              <p className="text-sm font-semibold text-gray-900">Gratis verzending</p>
              <p className="text-xs text-gray-600">Vanaf €50</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">↩️</div>
              <p className="text-sm font-semibold text-gray-900">30 dagen retour</p>
              <p className="text-xs text-gray-600">Niet goed = geld terug</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm font-semibold text-gray-900">Voor 23:00 besteld</p>
              <p className="text-xs text-gray-600">Morgen in huis</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-sm font-semibold text-gray-900">100.000+ klanten</p>
              <p className="text-xs text-gray-600">Gaan je voor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="voordelen" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            Waarom Droomvriendjes?
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
      <section id="producten" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Knuffels
            </h2>
            <p className="text-xl text-gray-600">Vanaf €49,95 - Winter Sale: 2e knuffel 50% korting!</p>
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
            Zie Droomvriendjes In Actie
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Bedrijfsgegevens */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_kidssleepaid/artifacts/nggirrob_Schermopname_12-1-2026_16586_chatgpt.com.jpeg" 
                  alt="Droomvriendjes Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <div className="text-purple-200 text-sm space-y-1">
                <p className="font-semibold text-white mb-2">Bedrijfsgegevens</p>
                <p>Droomvriendjes</p>
                <p>SCHAESBERGERWEG 103
                <p>6415 AD Heerlen</p>
                <p className="mt-3">KVK: 9921083</p>
                <p></p>
                
                <div className="mt-4 pt-4 border-t border-purple-700">
                  <p className="font-semibold text-white mb-1">Retouradres:</p>
                  <p>Centerpoort-Nieuwgraaf</p>
                  <p>Geograaf 16</p>
                  <p>6921 EW Duiven</p>
                </div>
              </div>
            </div>

            {/* Navigatie */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Navigatie</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#producten" className="hover:text-white transition-colors">Onze Kalmerende Knuffels</a></li>
                <li><a href="#producten" className="hover:text-white transition-colors">Alle producten</a></li>
                <li><a href="#producten" className="hover:text-white transition-colors">Voordeelbundels</a></li>
                <li><Link to="/over-ons" className="hover:text-white transition-colors">Over Droomvriendjes</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
                <li><Link to="/cadeaubon" className="hover:text-white transition-colors">Cadeaubon</Link></li>
                <li><Link to="/uitproberen" className="hover:text-white transition-colors">30 dagen gratis uitproberen</Link></li>
                <li><Link to="/reviews" className="hover:text-white transition-colors">Beoordelingen</Link></li>
                <li><Link to="/naam-bedenker" className="hover:text-white transition-colors">Droomvriendjes naam bedenker</Link></li>
              </ul>
            </div>

            {/* Droomvriendjes helpt bij */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Droomvriendjes helpt bij</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><Link to="/stress" className="hover:text-white transition-colors">Stressvermindering</Link></li>
                <li><Link to="/overprikkeling" className="hover:text-white transition-colors">Prikkelverwerking</Link></li>
                <li><Link to="/angst" className="hover:text-white transition-colors">Angstvermindering</Link></li>
                <li><Link to="/slaapproblemen" className="hover:text-white transition-colors">Beter slapen</Link></li>
                <li><Link to="/troost" className="hover:text-white transition-colors">Troost vinden</Link></li>
                <li><Link to="/hsp" className="hover:text-white transition-colors">Hoogsensitiviteit</Link></li>
                <li><Link to="/dementie" className="hover:text-white transition-colors">Dementie</Link></li>
              </ul>
            </div>

            {/* Klantenservice */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Klantenservice</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#producten" className="hover:text-white transition-colors">Zoeken</a></li>
                <li><Link to="/retourneren" className="hover:text-white transition-colors">Retourneren</Link></li>
                <li><Link to="/voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Beleid</Link></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Veelgestelde Vragen</a></li>
                <li><a href="#producten" className="hover:text-white transition-colors">Verzending</a></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
              <div className="mt-6">
                <p className="font-semibold text-white mb-2 text-sm">Betaalmethoden</p>
                <div className="text-purple-200 text-sm">
                  <p>iDEAL • Klarna</p>
                  <p>PayPal • Creditcard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-purple-800 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-purple-200 text-sm">&copy; 2025 Droomvriendjes. Alle rechten voorbehouden.</p>
              <div className="flex items-center space-x-4 text-purple-200 text-sm">
                <Link to="/voorwaarden" className="hover:text-white transition-colors">Voorwaarden</Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <span>•</span>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
