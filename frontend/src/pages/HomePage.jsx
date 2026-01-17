import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, reviews, benefits, features, testimonials, videos, faqs } from '../mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ShoppingCart, Moon, Heart, Sparkles, Monitor, ShieldCheck, Truck, Award, Play, X, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import CartSidebar from '../components/CartSidebar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { trackViewItemList, trackSelectItem } from '../utils/analytics';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, getTotal, getItemCount, isCartOpen, setIsCartOpen } = useCart();

  // GA4: Track view_item_list when page loads
  useEffect(() => {
    trackViewItemList(products, 'homepage_products', 'Homepage Producten');
  }, []);

  // GA4: Track product click
  const handleProductClick = (product, index) => {
    trackSelectItem(product, index, 'homepage_products', 'Homepage Producten');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28 md:h-32">
            <Link to="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_plush-revamp/artifacts/npuc23bl_lgoo%20ads%20%281%29.png" 
                alt="Droomvriendjes.nl - Voor een zachte nachtrust" 
                className="h-24 md:h-28 w-auto"
              />
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/knuffels" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Knuffels</Link>
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
      <CartSidebar />
      
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-4 text-center shadow-lg">
        <p className="text-lg md:text-2xl font-bold tracking-wide">
          WINTER SALE: 2E KNUFFEL 50% KORTING
        </p>
      </div>

      {/* Hero Section - Verbeterd voor mobiel */}
      <section className="relative bg-gradient-to-b from-[#fdf8f3] to-[#f5efe8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout - Image on top */}
          <div className="md:hidden">
            {/* Mobile Image */}
            <div className="relative w-full h-[300px] overflow-hidden">
              <img 
                src="https://i.imgur.com/Mj57dGY.png" 
                alt="Kind met Droomvriendje knuffel"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fdf8f3]"></div>
            </div>
            
            {/* Mobile Content */}
            <div className="px-4 pb-8 -mt-8 relative z-10">
              <h1 className="text-2xl font-serif font-bold text-[#5a4a3a] mb-2 leading-tight text-center">
                Meer dan een knuffel,
              </h1>
              <p className="text-xl font-serif font-bold text-purple-700 mb-6 leading-tight text-center">
                De beste vriend van je kind in het donker
              </p>
              
              {/* Mobile Features */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="text-center">
                  <span className="text-[#c9a55a] text-xl">✦</span>
                  <p className="text-[#5a4a3a] font-medium text-xs mt-1">Ontspanning & geborgenheid</p>
                </div>
                <div className="text-center">
                  <span className="text-[#c9a55a] text-xl">✦</span>
                  <p className="text-[#5a4a3a] font-medium text-xs mt-1">Lichtjes & geluiden</p>
                </div>
                <div className="text-center">
                  <span className="text-[#c9a55a] text-xl">✦</span>
                  <p className="text-[#5a4a3a] font-medium text-xs mt-1">Kind & volwassenen</p>
                </div>
              </div>
              
              {/* Mobile CTA */}
              <Button 
                size="lg" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg rounded-full shadow-lg"
              >
                <a href="#producten">Bekijk onze knuffels</a>
              </Button>
            </div>
          </div>

          {/* Desktop Layout - Side by side */}
          <div className="hidden md:flex items-center min-h-[600px] lg:min-h-[650px] px-6 lg:px-8">
            {/* Left Content */}
            <div className="w-1/2 pr-8 lg:pr-16">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#5a4a3a] mb-4 leading-tight">
                Meer dan een knuffel,
              </h1>
              <p className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-purple-700 mb-8 leading-tight">
                De beste vriend van je kind in het donker
              </p>
              
              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-[#c9a55a] text-xl">✦</span>
                  <p className="text-[#5a4a3a] font-medium">Brengt ontspanning en geborgenheid</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#c9a55a] text-xl">✦</span>
                  <p className="text-[#5a4a3a] font-medium">Kalmerende lichtjes en rustgevende geluiden</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#c9a55a] text-xl">✦</span>
                  <p className="text-[#5a4a3a] font-medium">Voor kinderen én volwassenen</p>
                </div>
              </div>
              
              {/* CTA */}
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <a href="#producten">Bekijk onze knuffels</a>
              </Button>
            </div>
            
            {/* Right Image */}
            <div className="w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://i.imgur.com/Mj57dGY.png" 
                  alt="Kind met Droomvriendje knuffel"
                  className="w-full h-[500px] lg:h-[550px] object-cover object-center"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="bg-amber-100 rounded-full p-2">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.7/5 sterren</p>
                  <p className="text-sm text-gray-600">100.000+ tevreden klanten</p>
                </div>
              </div>
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
              <p className="font-bold text-gray-900 text-sm mb-1">14 dagen bedenktijd</p>
              <p className="text-xs text-gray-600">Defect? Geld terug!</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">👥</div>
              <p className="font-bold text-gray-900 text-sm mb-1">10k+ klanten</p>
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

      {/* Products Section - SLIDER */}
      <section id="producten" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ✨ Onze Collectie
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Jouw <span className="text-purple-600">Droomvriendje</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Speciale slaapknuffels met rustgevende lichtjes en geluiden voor een betere nachtrust
            </p>
          </div>
          
          {/* Product Slider */}
          <div className="relative px-4 md:px-12">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="product-slider !pb-14"
              data-testid="product-slider"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 h-full flex flex-col">
                    {/* Badge */}
                    <div className="relative">
                      {product.badge && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                            product.badge === 'BESTSELLER' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' :
                            product.badge === 'NIEUW' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                            product.badge === 'POPULAIR' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' :
                            'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          }`}>
                            {product.badge}
                          </span>
                        </div>
                      )}
                      
                      {/* Product Image */}
                      <Link to={`/product/${product.id}`} onClick={() => { handleProductClick(product, index); window.scrollTo(0, 0); }}>
                        <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6 cursor-pointer overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                            data-testid={`product-image-${product.id}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </Link>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      {/* Title */}
                      <Link to={`/product/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Short Description */}
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
                        {product.description}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-4">
                        {product.originalPrice > product.price ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-gray-400 line-through">€{product.originalPrice.toFixed(2)}</span>
                            <span className="text-2xl font-bold text-purple-600">€{product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {/* Add to Cart Button */}
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-5 rounded-xl shadow-md hover:shadow-lg transition-all"
                        onClick={() => addToCart(product)}
                        data-testid={`add-to-cart-slider-${product.id}`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        In Winkelmandje
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <button 
              className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-50 hover:shadow-xl transition-all border border-gray-200"
              aria-label="Vorige"
              data-testid="slider-prev-button"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </button>
            <button 
              className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-50 hover:shadow-xl transition-all border border-gray-200"
              aria-label="Volgende"
              data-testid="slider-next-button"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </button>
          </div>
          
          {/* View All Products Link */}
          <div className="text-center mt-10">
            <Link to="/knuffels">
              <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg font-semibold rounded-full">
                Bekijk Alle Knuffels
              </Button>
            </Link>
          </div>
          
          {/* Trust Section Below Products */}
          <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg border border-purple-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">100.000+</p>
                <p className="text-sm text-gray-600 font-medium">Tevreden Klanten</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">86%</p>
                <p className="text-sm text-gray-600 font-medium">Slaapt Beter</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">4.7/5</p>
                <p className="text-sm text-gray-600 font-medium">Trustpilot Score</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-green-600 mb-2">30</p>
                <p className="text-sm text-gray-600 font-medium">Dagen Garantie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section - Premium Design */}
      <section className="py-20 bg-gradient-to-b from-[#fdfcfa] to-[#f5f0eb] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-5 py-2 rounded-full mb-6 border border-amber-200/50">
              <span className="text-amber-600 text-lg">🏆</span>
              <span className="text-amber-800 font-semibold text-sm tracking-wide">MEEST VERKOCHT</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kies jouw <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Droomvriendje</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Onze top 3 bestsellers, geliefd door meer dan 100.000 gezinnen in Nederland
            </p>
          </div>
          
          {/* Bestseller Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            
            {/* Schaap - Bestseller #2 */}
            <div className="group relative" data-testid="bestseller-card-schaap">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100/80 group-hover:border-emerald-200 group-hover:-translate-y-2">
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
                    <span className="text-base">🥈</span>
                    <span>#2 BESTSELLER</span>
                  </div>
                </div>
                
                {/* Image Container */}
                <Link to="/product/2" onClick={() => window.scrollTo(0, 0)}>
                  <div className="relative pt-14 pb-6 px-6 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white">
                    <div className="aspect-square relative">
                      <img 
                        src="https://i.imgur.com/vYpeb4c.jpeg" 
                        alt="Schaap"
                        className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      {/* Floating feature badges */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        <span className="bg-white/95 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-100">🌟 Projectie</span>
                        <span className="bg-white/95 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-100">🎵 White Noise</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Content */}
                <div className="p-6 pt-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Schaap</h3>
                  <p className="text-gray-500 text-sm mb-4">Zacht, knuffelbaar & rustgevend</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(143 reviews)</span>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-5">
                    <span className="text-3xl font-bold text-gray-900">€59,95</span>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                    onClick={() => addToCart(products.find(p => p.id === 2))}
                    data-testid="bestseller-add-schaap"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Toevoegen aan winkelwagen
                  </Button>
                  
                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Gratis verzending</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 14 dagen retour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teddy - Bestseller #1 (Featured) */}
            <div className="group relative md:-mt-4 md:mb-4" data-testid="bestseller-card-teddy">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_50px_rgba(147,51,234,0.15)] hover:shadow-[0_25px_70px_rgba(147,51,234,0.25)] transition-all duration-500 border-2 border-purple-200 group-hover:border-purple-300 group-hover:-translate-y-2 relative">
                {/* Popular ribbon */}
                <div className="absolute -right-12 top-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-12 py-1.5 rotate-45 shadow-lg z-30">
                  POPULAIR
                </div>
                
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-purple-500/30 flex items-center gap-1.5">
                    <span className="text-base">🥇</span>
                    <span>#1 BESTSELLER</span>
                  </div>
                </div>
                
                {/* Image Container */}
                <Link to="/product/3" onClick={() => window.scrollTo(0, 0)}>
                  <div className="relative pt-14 pb-6 px-6 bg-gradient-to-br from-purple-50 via-pink-50/50 to-white">
                    <div className="aspect-square relative">
                      <img 
                        src="https://customer-assets.emergentagent.com/job_bb5b58b9-cb3e-4b45-863f-d854d8773ec0/artifacts/pm1mjx73_image.png" 
                        alt="Teddy"
                        className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      {/* Floating feature badges */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        <span className="bg-white/95 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-100">🌟 Projectie</span>
                        <span className="bg-white/95 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-100">🎵 Muziek</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Content */}
                <div className="p-6 pt-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Teddy</h3>
                  <p className="text-gray-500 text-sm mb-4">Meest gekozen door ouders</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(219 reviews)</span>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-5">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">€59,95</span>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                    onClick={() => addToCart(products.find(p => p.id === 3))}
                    data-testid="bestseller-add-teddy"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Toevoegen aan winkelwagen
                  </Button>
                  
                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Gratis verzending</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 14 dagen retour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panda - Bestseller #3 */}
            <div className="group relative" data-testid="bestseller-card-panda">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100/80 group-hover:border-blue-200 group-hover:-translate-y-2">
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-1.5">
                    <span className="text-base">🥉</span>
                    <span>#3 BESTSELLER</span>
                  </div>
                </div>
                
                {/* Best Value Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    BESTE PRIJS
                  </div>
                </div>
                
                {/* Image Container */}
                <Link to="/product/11" onClick={() => window.scrollTo(0, 0)}>
                  <div className="relative pt-14 pb-6 px-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white">
                    <div className="aspect-square relative">
                      <img 
                        src="https://i.imgur.com/fhVs30E.jpeg" 
                        alt="Panda"
                        className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      {/* Floating feature badges */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        <span className="bg-white/95 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-100">🌟 Projectie</span>
                        <span className="bg-white/95 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-100">💤 Rustgevend</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Content */}
                <div className="p-6 pt-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Panda</h3>
                  <p className="text-gray-500 text-sm mb-4">Super rustgevend & schattig</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(287 reviews)</span>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-5">
                    <span className="text-sm text-gray-400 line-through mr-2">€59,95</span>
                    <span className="text-3xl font-bold text-gray-900">€49,95</span>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                    onClick={() => addToCart(products.find(p => p.id === 11))}
                    data-testid="bestseller-add-panda"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Toevoegen aan winkelwagen
                  </Button>
                  
                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Gratis verzending</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 14 dagen retour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-14">
            <Link to="/knuffels">
              <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg font-semibold rounded-full group">
                Bekijk alle knuffels
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            Zie Droomvriendjes In Actie
          </h2>
          <div className="flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full">
              <div className="aspect-[9/16] bg-gray-900">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  autoPlay
                  muted
                  loop
                >
                  <source src="/droomvriendjes_video.mp4" type="video/mp4" />
                  Je browser ondersteunt geen video.
                </video>
              </div>
            </div>
            {/* Tekst onder de video */}
            <div className="mt-4 text-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/3gktziez_image.png" 
                alt="Droomvriendjes - Rust in je armen"
                className="h-12 md:h-16 mx-auto"
              />
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
                  <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
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
            <span>✓ 14 dagen retour</span>
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
                <p>Schaesbergerweg 103</p>
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
                <li><Link to="/knuffels" className="hover:text-white transition-colors">Onze Kalmerende Knuffels</Link></li>
                <li><Link to="/knuffels" className="hover:text-white transition-colors">Alle producten</Link></li>
                <li><Link to="/ouders-slaaptips" className="hover:text-white transition-colors">Ouders slaaptips</Link></li>
                <li><Link to="/over-ons" className="hover:text-white transition-colors">Over Droomvriendjes</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
                <li><Link to="/cadeaubon" className="hover:text-white transition-colors">Cadeaubon</Link></li>
                <li><Link to="/uitproberen" className="hover:text-white transition-colors">14 dagen gratis uitproberen</Link></li>
                <li><Link to="/reviews" className="hover:text-white transition-colors">Beoordelingen</Link></li>
                <li><Link to="/naam-bedenker" className="hover:text-white transition-colors">Droomvriendjes naam bedenker</Link></li>
                <li><Link to="/vrouwen-60" className="hover:text-white transition-colors">Vrouwen 60+</Link></li>
                <li><Link to="/ouders-baby" className="hover:text-white transition-colors">Ouders van baby's</Link></li>
                <li><Link to="/ouders-peuters" className="hover:text-white transition-colors">Ouders van peuters</Link></li>
                <li><Link to="/ouders-extra-behoeften" className="hover:text-white transition-colors">Extra behoeften</Link></li>
              </ul>
            </div>

            {/* Droomvriendjes helpt bij */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Droomvriendjes helpt bij</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><Link to="/stress" className="hover:text-white transition-colors">Stressvermindering</Link></li>
                <li><Link to="/overprikkeling" className="hover:text-white transition-colors">Prikkelverwerking</Link></li>
                <li><Link to="/angst" className="hover:text-white transition-colors">Angstvermindering</Link></li>
                <li><Link to="/tips-bedtijd" className="hover:text-white transition-colors">Tips voor bedtijd</Link></li>
                <li><Link to="/rustmoment-ouders" className="hover:text-white transition-colors">Rustmoment voor ouders</Link></li>
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
