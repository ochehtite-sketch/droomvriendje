import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, reviews, benefits, features, testimonials, videos, faqs } from '../mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ShoppingCart, Moon, Heart, Sparkles, Monitor, ShieldCheck, Truck, Award, Play, X, Plus, Minus } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, getTotal, getItemCount, isCartOpen, setIsCartOpen } = useCart();

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
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🧸</span>
              <span className="text-2xl font-bold text-purple-900">Droomvriendjes</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <a href="#producten" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Knuffels</a>
              <Link to="/cadeaubon" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Cadeaubonnen</Link>
              <Link to="/over-ons" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Over Droomvriendjes</Link>
              <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact</Link>
            </nav>
            <Button variant="outline" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getItemCount()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
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
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Totaal:</span>
                    <span>€{getTotal().toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="text-sm text-green-600 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Gratis verzending!
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                  >
                    Afrekenen
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Trust Badges Bar - Niet sticky, scrollt mee */}
      <div className="bg-amber-50 border-b border-amber-100 py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-sm text-center md:text-left">
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

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-4 text-center shadow-lg">
        <p className="text-lg md:text-2xl font-bold tracking-wide">
          WINTER SALE: 2E KNUFFEL 50% KORTING
        </p>
      </div>

      {/* Hero Section - Met achtergrondafbeelding */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* Achtergrondafbeelding */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/ab57nybn_ChatGPT%20Image%2012%20jan%202026%2C%2012_38_53.png')`
          }}
        >
          {/* Overlay voor betere leesbaarheid */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f1]/60 via-[#faf6f1]/40 to-[#faf6f1]/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
          <div className="flex flex-col items-center">
            {/* Hoofdtekst bovenaan */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5a4a3a] mb-4 leading-tight">
                Rust in je armen,
                <br />
                wanneer je het nodig hebt
              </h1>
            </div>
          </div>
        </div>
        
        {/* Kenmerken onderaan */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#faf6f1]/95 py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Drie kenmerken in rij */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
              <div className="flex flex-col items-center">
                <span className="text-[#c9a55a] text-2xl mb-2">✦</span>
                <p className="text-[#5a4a3a] font-medium text-sm md:text-base">Brengt ontspanning<br />en geborgenheid</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#c9a55a] text-2xl mb-2">✦</span>
                <p className="text-[#5a4a3a] font-medium text-sm md:text-base">Kalmerende lichtjes<br />en rustgevende geluiden</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#c9a55a] text-2xl mb-2">✦</span>
                <p className="text-[#5a4a3a] font-medium text-sm md:text-base">Voor kinderen én<br />volwassenen</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-[#5a4a3a] hover:bg-[#4a3a2a] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <a href="#producten">Bekijk onze knuffels</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Features onder hero */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🚚</div>
              <p className="font-bold text-gray-900 text-sm mb-1">Gratis verzending</p>
              <p className="text-xs text-gray-600">Voor 23:00 besteld, morgen in huis</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">↩️</div>
              <p className="font-bold text-gray-900 text-sm mb-1">30 dagen retour</p>
              <p className="text-xs text-gray-600">Niet goed = geld terug</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">👥</div>
              <p className="font-bold text-gray-900 text-sm mb-1">100.000+ klanten</p>
              <p className="text-xs text-gray-600">Gaan je voor</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-bold text-gray-900 text-sm mb-1">CE gecertificeerd</p>
              <p className="text-xs text-gray-600">Veilig voor alle leeftijden</p>
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
                  <span className="text-3xl">😴</span>
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

      {/* Products Section - PREMIUM */}
      <section id="producten" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Onze Collectie
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ontdek Onze <span className="text-blue-600">Droomvriendjes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Alle knuffels vanaf €59,95 • Gratis verzending
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200 rounded-2xl bg-white">
                <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8 overflow-hidden">
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg z-10 px-3 py-1">
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    -50% op 2e
                  </div>
                  
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-72 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{product.shortName}</h3>
                    <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  {/* Features - Icons */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-1">🌟</span> Projectie
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-1">🎵</span> White Noise
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-1">💡</span> LED Licht
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-1">⏰</span> Timer
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 ml-2">/ stuk</span>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 font-semibold">✓ Op voorraad - Voor 23:00 besteld, morgen in huis</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Link to={`/product/${product.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
                        Bekijk Details
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
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
          
          {/* Trust Section Below Products */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">100.000+</p>
                <p className="text-sm text-gray-600 font-medium">Tevreden Klanten</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">86%</p>
                <p className="text-sm text-gray-600 font-medium">Slaapt Beter</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-pink-600 mb-2">4.7/5</p>
                <p className="text-sm text-gray-600 font-medium">Trustpilot Score</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">30</p>
                <p className="text-sm text-gray-600 font-medium">Dagen Garantie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            Zie Droomvriendjes In Actie
          </h2>
          <div className="flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full">
              <div className="aspect-[9/16] bg-gray-900">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  poster=""
                  onTimeUpdate={(e) => {
                    if (e.target.currentTime >= 18) {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }
                  }}
                >
                  <source src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/fzcnrsz0_Oujikidz%203%20%283%29.mov" type="video/quicktime" />
                  <source src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/fzcnrsz0_Oujikidz%203%20%283%29.mov" type="video/mp4" />
                  Je browser ondersteunt geen video.
                </video>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-sm bg-black/50 rounded-lg py-2 px-4 backdrop-blur-sm">
                  🧸 Droomvriendjes - Rust in je armen
                </p>
              </div>
            </div>
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
                <span className="text-3xl">🧸</span>
                <span className="text-2xl font-bold">Droomvriendjes</span>
              </div>
              <div className="text-purple-200 text-sm space-y-1">
                <p className="font-semibold text-white mb-2">Bedrijfsgegevens</p>
                <p>Droomvriendjes</p>
                <p>SCHAESBERGERWEG 103</p>
                <p>6415 AD Heerlen</p>
                <p className="text-xs italic">(Dit is geen bezoekadres)</p>
                <p className="mt-3">KVK: 9921083</p>
                
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
