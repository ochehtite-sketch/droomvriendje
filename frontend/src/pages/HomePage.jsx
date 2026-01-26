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
import Header from '../components/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { trackViewItemList, trackSelectItem } from '../utils/analytics';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, getTotal, getItemCount, isCartOpen, setIsCartOpen } = useCart();

  // Filter out of stock products from homepage
  const availableProducts = products.filter(p => p.inStock !== false);

  // GA4: Track view_item_list when page loads
  useEffect(() => {
    trackViewItemList(availableProducts, 'homepage_products', 'Homepage Producten');
  }, []);

  // GA4: Track product click
  const handleProductClick = (product, index) => {
    trackSelectItem(product, index, 'homepage_products', 'Homepage Producten');
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <Header />

      {/* Shopping Cart Sidebar */}
      <CartSidebar />
      
      {/* Promo Banner - Warm Brown */}
      <div className="bg-warm-brown-500 text-white py-3 text-center">
        <p className="text-sm md:text-base font-medium tracking-wide">
          WINTER SALE: 2E KNUFFEL 50% KORTING ❄️
        </p>
      </div>

      {/* Hero Section - Warm Brown Theme */}
      <section className="relative bg-white overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
            </div>
            
            {/* Mobile Content */}
            <div className="px-4 pb-8 -mt-8 relative z-10">
              <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight text-center">
                Meer dan een knuffel,
              </h1>
              <p className="text-lg font-bold text-warm-brown-500 mb-4 leading-tight text-center">
                De beste vriend van je kind in het donker.
              </p>
              
              {/* Mobile Social Proof */}
              <div className="bg-white/90 rounded-xl p-3 mb-4 shadow-sm">
                <p className="text-xs text-gray-500 text-center mb-1">Trusted by 100,000+ Parents</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex -space-x-1">
                    <img src="https://i.pravatar.cc/24?img=1" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/24?img=5" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/24?img=8" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900">4.9/5</span>
                  </div>
                  <span className="text-xs text-gray-500">(500+ reviews)</span>
                </div>
              </div>
              
              {/* Mobile Features */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="text-center bg-white/60 rounded-lg p-2">
                  <span className="text-warm-brown-500 text-lg">✓</span>
                  <p className="text-slate-700 font-medium text-xs mt-1">Gratis verzending</p>
                </div>
                <div className="text-center bg-white/60 rounded-lg p-2">
                  <span className="text-warm-brown-500 text-lg">✓</span>
                  <p className="text-slate-700 font-medium text-xs mt-1">14 dagen retour</p>
                </div>
                <div className="text-center bg-white/60 rounded-lg p-2">
                  <span className="text-warm-brown-500 text-lg">✓</span>
                  <p className="text-slate-700 font-medium text-xs mt-1">CE-gecertificeerd</p>
                </div>
              </div>
              
              {/* Mobile CTA */}
              <Button 
                size="lg" 
                className="w-full bg-warm-brown-500 hover:bg-warm-brown-600 text-white py-6 text-lg rounded-xl shadow-lg shadow-warm-brown-200 font-bold"
                data-testid="hero-cta-mobile"
              >
                <a href="#producten">Bekijk Onze Knuffels</a>
              </Button>
              <p className="text-center text-sm text-gray-600 mt-2">Voor 23:00 besteld = morgen in huis</p>
            </div>
          </div>

          {/* Desktop Layout - Side by side */}
          <div className="hidden md:flex items-center min-h-[600px] lg:min-h-[650px] px-6 lg:px-8">
            {/* Left Content */}
            <div className="w-1/2 pr-8 lg:pr-16">
              {/* Urgency Badge */}
              <div className="inline-flex items-center bg-warm-brown-50 text-warm-brown-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-warm-brown-100">
                Trusted by 100,000+ Parents
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
                Meer dan een knuffel, <br />
                <span className="text-warm-brown-500">De beste vriend van je kind in het donker.</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-6 leading-relaxed max-w-lg">
                Help je kindje sneller in slaap vallen met onze zachte knuffels voorzien van rustgevende geluiden en sfeerlicht.
              </p>
              
              {/* Stats Row */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2">
                  <div className="flex -space-x-1">
                    <img src="https://i.pravatar.cc/24?img=1" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/24?img=5" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/24?img=8" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">4.9/5</span>
                  <span className="text-gray-500 text-sm">(500+ reviews)</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Button 
                  size="lg" 
                  className="bg-warm-brown-500 hover:bg-warm-brown-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-warm-brown-200 hover:shadow-xl transition-all font-bold transform hover:-translate-y-1"
                  data-testid="hero-cta-desktop"
                >
                  <a href="#producten" className="flex items-center gap-2">
                    Bekijk Onze Knuffels
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:border-warm-brown-500 px-6 py-6 text-lg rounded-xl"
                >
                  <a href="#voordelen">Hoe het werkt</a>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-warm-brown-500" />
                  Gratis verzending
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-warm-brown-500" />
                  14 dagen retour
                </span>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://i.imgur.com/Mj57dGY.png" 
                  alt="Kind met Droomvriendje knuffel"
                  className="w-full h-[500px] lg:h-[550px] object-cover object-center"
                />
              </div>
              
              {/* Floating badge - Delivery */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Direct Leverbaar</p>
                  <p className="text-xs text-slate-500">Bestel voor 23:00, morgen in huis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Features - Soft Blue Background */}
      <section className="py-8 bg-soft-blue border-y border-warm-brown-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <Truck className="w-6 h-6 text-warm-brown-500" />
              <p className="font-semibold text-sm">Gratis Verzending</p>
              <p className="text-xs text-slate-500">Vanaf €59,95</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <ShieldCheck className="w-6 h-6 text-warm-brown-500" />
              <p className="font-semibold text-sm">14 Dagen Bedenktijd</p>
              <p className="text-xs text-slate-500">Niet tevreden? Geld terug</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Heart className="w-6 h-6 text-warm-brown-500" />
              <p className="font-semibold text-sm">100.000+ Klanten</p>
              <p className="text-xs text-slate-500">Blije ouders en kinderen</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Award className="w-6 h-6 text-warm-brown-500" />
              <p className="font-semibold text-sm">CE Gecertificeerd</p>
              <p className="text-xs text-slate-500">Veilig voor alle leeftijden</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Warm Brown Theme */}
      <section id="voordelen" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-warm-brown-600 font-bold uppercase tracking-widest text-sm">Onze Favorieten</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              Waarom Droomvriendjes?
            </h2>
            <div className="w-24 h-1 bg-warm-brown-500 mx-auto rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-warm-brown-100 hover:border-warm-brown-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-warm-brown-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-warm-brown-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Verbeterde Nachtrust</h3>
                <p className="text-slate-600">86% van de kinderen valt sneller in slaap en slaapt beter door</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-warm-brown-100 hover:border-warm-brown-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-warm-brown-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-warm-brown-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Minder Stress & Angst</h3>
                <p className="text-slate-600">Helpt kinderen ontspannen en zich veilig te voelen</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-warm-brown-100 hover:border-warm-brown-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-warm-brown-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-warm-brown-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Rustgevend & Kalmerend</h3>
                <p className="text-slate-600">Zachte lichten en muziek voor optimale ontspanning</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-warm-brown-100 hover:border-warm-brown-300 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-warm-brown-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-warm-brown-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Minder Schermtijd</h3>
                <p className="text-slate-600">Een gezond schermvrij alternatief voor het slapengaan</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section - Warm Brown Theme */}
      <section id="producten" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-warm-brown-600 font-bold uppercase tracking-widest text-sm">
              Onze Collectie
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Meest Verkochte Knuffels
            </h2>
            <div className="w-24 h-1 bg-warm-brown-500 mx-auto rounded-full"></div>
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
              {availableProducts.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-slate-100">
                    {/* Product Image with Badge */}
                    <div className="relative overflow-hidden aspect-square">
                      {/* Badge - Top Left */}
                      {product.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-warm-brown-700 text-white text-xs font-bold px-3 py-1 rounded-lg">
                            {product.badge}
                          </span>
                        </div>
                      )}
                      
                      {/* Product Image */}
                      <Link to={`/product/${product.id}`} onClick={() => { handleProductClick(product, index); window.scrollTo(0, 0); }}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          data-testid={`product-image-${product.id}`}
                        />
                      </Link>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-8 flex flex-col flex-grow space-y-4">
                      <Link to={`/product/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-warm-brown-600 transition-colors cursor-pointer">
                            {product.shortName || product.name}
                          </h3>
                          <div className="text-right">
                            <p className="text-2xl font-black text-warm-brown-600">€{product.price.toFixed(2).replace('.', ',')}</p>
                          </div>
                        </div>
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center text-amber-400 text-sm gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-slate-500 font-medium">({product.reviews} reviews)</span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-slate-600 text-sm line-clamp-2 flex-1">
                        {product.description}
                      </p>
                      
                      {/* Add to Cart Button */}
                      <div className="pt-4 mt-auto">
                        <Button 
                          className="w-full py-4 bg-warm-brown-500 text-white font-bold rounded-xl hover:bg-warm-brown-600 transition flex items-center justify-center gap-2"
                          onClick={() => addToCart(product)}
                          data-testid={`add-to-cart-slider-${product.id}`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          In Winkelwagen
                        </Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <button 
              className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-warm-brown-50 hover:shadow-xl transition-all border border-warm-brown-100"
              aria-label="Vorige"
              data-testid="slider-prev-button"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-warm-brown-500" />
            </button>
            <button 
              className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-warm-brown-50 hover:shadow-xl transition-all border border-warm-brown-100"
              aria-label="Volgende"
              data-testid="slider-next-button"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-warm-brown-500" />
            </button>
          </div>
          
          {/* View All Products Link */}
          <div className="text-center mt-10">
            <Link to="/knuffels">
              <Button variant="outline" className="border-2 border-warm-brown-500 text-warm-brown-600 hover:bg-warm-brown-50 px-8 py-6 text-lg font-semibold rounded-xl">
                Bekijk Alle Knuffels
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers Section - Warm Brown Theme */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <span className="text-warm-brown-600 font-bold uppercase tracking-widest text-sm">Vers van de Pers</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Nieuwe Collectie</h2>
            </div>
            <Link to="/knuffels" className="text-warm-brown-600 font-bold hover:underline flex items-center gap-2">
              Bekijk Alles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mini Product Cards */}
            {availableProducts.slice(0, 4).map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group" onClick={() => window.scrollTo(0, 0)}>
                <div className="relative rounded-2xl overflow-hidden aspect-square mb-4">
                  <span className="absolute top-3 left-3 bg-warm-brown-500 text-white px-2 py-1 rounded-md text-[10px] font-bold z-10 uppercase">
                    {product.badge || 'Nieuw'}
                  </span>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-warm-brown-600 transition">{product.shortName || product.name}</h4>
                <p className="text-warm-brown-600 font-black">€{product.price.toFixed(2).replace('.', ',')}</p>
              </Link>
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

      {/* Testimonials Section - Enhanced Trustpilot Style */}
      <section className="py-20 bg-gradient-to-b from-[#fdf8f3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trustpilot-style Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-md border border-gray-100 mb-6">
              <span className="text-green-500 font-bold text-lg">★</span>
              <span className="text-gray-700 font-semibold">Trustpilot</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#5a4a3a] mb-4">
              Vertrouwd door 10.000+ ouders
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="text-xl font-bold text-gray-900">4.9/5</span>
              <span className="text-gray-500">op Trustpilot</span>
            </div>
            {/* Customer Avatars */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/40?img=1" alt="Klant" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <img src="https://i.pravatar.cc/40?img=5" alt="Klant" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <img src="https://i.pravatar.cc/40?img=8" alt="Klant" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <img src="https://i.pravatar.cc/40?img=9" alt="Klant" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-[#8B7355] flex items-center justify-center text-white text-xs font-bold">
                  +9K
                </div>
              </div>
              <span className="text-sm text-gray-600 ml-2">500+ beoordelingen</span>
            </div>
          </div>
          
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`testimonial-card-${index}`}
              >
                {/* Green Trustpilot Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-green-500 flex items-center justify-center">
                      <Star className="w-4 h-4 fill-white text-white" />
                    </div>
                  ))}
                </div>
                
                {/* Review Title */}
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  {index === 0 && "Eindelijk rust in huis! 🎉"}
                  {index === 1 && "Beste investering ooit 💯"}
                  {index === 2 && "Perfect voor onze tweeling 👶👶"}
                </h3>
                
                {/* Review Text */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Reviewer Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img 
                    src={`https://i.pravatar.cc/48?img=${index + 10}`} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span className="text-green-500">✓</span>
                      <span>Geverifieerde aankoop</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="text-center mt-10">
            <Link to="/reviews">
              <Button 
                variant="outline" 
                className="border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#f5efe8] px-8 py-6 text-lg font-semibold rounded-full"
                data-testid="view-all-reviews-btn"
              >
                Bekijk alle 500+ reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section - Enhanced with Photos */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⭐ Klantbeoordelingen
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#5a4a3a] mb-4">
              Echte Reviews van Echte Ouders
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-gray-900">4.9/5</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">500+ geverifieerde reviews</span>
            </div>
          </div>
          
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, index) => (
              <div 
                key={review.id} 
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#8B7355]/30"
                data-testid={`review-card-${index}`}
              >
                {/* Header with Avatar */}
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={`https://i.pravatar.cc/48?img=${(review.id % 20) + 20}`}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{review.name}</span>
                      {review.verified && (
                        <span className="text-green-500 text-sm flex items-center gap-1">
                          <span>✓</span> Geverifieerd
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* Review Content */}
                <h4 className="font-bold text-[#5a4a3a] mb-2">{review.title}</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{review.text}</p>
                
                {/* Product Tag */}
                <div className="pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1 bg-[#f5efe8] text-[#8B7355] px-3 py-1 rounded-full text-xs font-medium">
                    🧸 {review.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-10">
            <Link to="/reviews">
              <Button 
                className="bg-[#8B7355] hover:bg-[#6d5a45] text-white px-8 py-6 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                data-testid="load-more-reviews-btn"
              >
                Bekijk Alle Reviews →
              </Button>
            </Link>
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
