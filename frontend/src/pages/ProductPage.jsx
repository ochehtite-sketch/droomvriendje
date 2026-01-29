import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, reviews, faqs } from '../mockData';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ShoppingCart, Check, Sparkles, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { trackViewItem } from '../utils/analytics';
import { AdSquare, AdMultiplex } from '../components/AdSense';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = useMemo(() => {
    return products.find(p => p.id === parseInt(id));
  }, [id]);

  // Create gallery array - main image + unique gallery images (no duplicates)
  const galleryImages = useMemo(() => {
    if (!product) return [];
    const images = [product.image];
    if (product.gallery && product.gallery.length > 0) {
      // Filter out duplicates - only add images that aren't already in the array
      product.gallery.forEach(img => {
        if (!images.includes(img)) {
          images.push(img);
        }
      });
    }
    return images;
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0); // Reset to first image when product changes
  }, [id]);

  useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleDirectOrder = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  if (!product) {
    return (
      <Layout backButtonText="Terug">
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Product laden...</p>
        </div>
      </Layout>
    );
  }

  const productReviews = reviews.filter(r => r.product === product.shortName);

  // Schema.org Product structured data for Google Merchant Center compliance
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": `DV-${product.id.toString().padStart(4, '0')}`,
    "mpn": `DV-${product.id.toString().padStart(4, '0')}`,
    "brand": {
      "@type": "Brand",
      "name": "Droomvriendjes"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://droomvriendjes.nl/product/${product.id}`,
      "priceCurrency": "EUR",
      "price": product.price.toFixed(2),
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Droomvriendjes",
        "url": "https://droomvriendjes.nl"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "EUR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": ["NL", "BE"]
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": ["NL", "BE"],
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || "4.9",
      "reviewCount": product.reviews || "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <Layout backButtonText="Terug" showPromoBanner={false} bgClassName="bg-gradient-to-b from-[#fdf8f3] to-[#f5efe8]">
      {/* Schema.org Product Data for Google Merchant */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative bg-[#faf7f4] rounded-3xl p-8 mb-4 shadow-sm">
                <img 
                  src={galleryImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[500px]"
                />
                
                {/* Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? galleryImages.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      aria-label="Vorige foto"
                    >
                      <ChevronLeft className="w-6 h-6 text-[#8B7355]" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === galleryImages.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      aria-label="Volgende foto"
                    >
                      <ChevronRight className="w-6 h-6 text-[#8B7355]" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery - Show only unique images */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={`thumb-${idx}-${img.slice(-10)}`}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx 
                          ? 'border-[#8B7355] ring-2 ring-[#8B7355]/30 scale-105' 
                          : 'border-gray-200 hover:border-[#8B7355]/50 hover:scale-102'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} foto ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                {/* Urgency Badge */}
                {product.badge && (
                  <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    🔥 {product.badge}
                  </div>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-[#5a4a3a] mb-2">
                  {product.name}
                </h1>
                
                {/* Subtitle/Tagline */}
                <p className="text-lg text-[#8B7355] italic mb-4">
                  {product.shortName === 'Lotgenootje Konijn' && 'Projecteert sterren + speelt hartslaggeluid voor een geruststellende nachtrust'}
                  {product.shortName === 'Lotgenootje Beer' && 'De perfecte slaapmaatje met rustgevende hartslag en ademhaling'}
                  {product.shortName === 'Lotgenootje Olifant' && 'Grote knuffel met grote troost - kalmerende geluiden voor diepe slaap'}
                  {!['Lotgenootje Konijn', 'Lotgenootje Beer', 'Lotgenootje Olifant'].includes(product.shortName) && 'Helpt je kindje sneller en rustiger inslapen'}
                </p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">
                    {product.rating}/5.0 ({product.reviews} reviews)
                  </span>
                </div>
                
                {/* Social Proof Bar */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6 flex items-center gap-4 flex-wrap">
                  <span className="text-sm text-green-800 font-medium flex items-center gap-1">
                    <span className="text-green-600">✓</span> 86% van ouders zegt: kind slaapt beter
                  </span>
                  <span className="text-sm text-green-800 font-medium flex items-center gap-1">
                    <span className="text-green-600">✓</span> 10.000+ tevreden klanten
                  </span>
                </div>
                
                {/* Emotional Description */}
                <div className="bg-[#faf7f4] rounded-xl p-4 mb-6 border border-[#e8e0d8]">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="text-2xl">🧸</span> Dit lieve {product.shortName} helpt jouw kindje makkelijker in slaap vallen. 
                    Met rustgevende geluiden en een zacht nachtlampje voelt je kleintje zich geborgen en droomt sneller weg – 
                    terwijl jij ook eindelijk je rust krijgt.
                  </p>
                </div>
              </div>

              {/* Price Section - CRO Optimized */}
              <div className="bg-gradient-to-r from-[#f5efe8] to-[#fdf8f3] rounded-2xl p-6 mb-6 border border-[#e8e0d8]">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-4xl md:text-5xl font-bold text-[#5a4a3a]">€{product.price.toFixed(2).replace('.', ',')}</span>
                    <span className="text-gray-500 text-sm ml-2 line-through">€{(product.price * 1.3).toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse">
                    🎁 2e knuffel 50% korting!
                  </div>
                </div>
                <p className="text-green-700 font-medium mt-2 text-sm">
                  ✓ Gratis verzending · ✓ Morgen in huis · ✓ 14 dagen retour
                </p>
              </div>

              {/* Key Features - Quick Scan */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white border border-[#e8e0d8] rounded-xl p-3">
                  <span className="text-xl">✩</span>
                  <span className="text-sm font-medium text-gray-700">Kalmerende sterrenhemel</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#e8e0d8] rounded-xl p-3">
                  <span className="text-xl">💗</span>
                  <span className="text-sm font-medium text-gray-700">White noise & hartslag</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#e8e0d8] rounded-xl p-3">
                  <span className="text-xl">⏰</span>
                  <span className="text-sm font-medium text-gray-700">Automatische timer</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#e8e0d8] rounded-xl p-3">
                  <span className="text-xl">🧺</span>
                  <span className="text-sm font-medium text-gray-700">Wasbaar & veilig</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#5a4a3a] mb-4">Voordelen:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#5a4a3a] mb-4">Eigenschappen:</h3>
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Sparkles className="w-5 h-5 text-[#8B7355] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons - CRO Optimized */}
              <div className="space-y-3 mb-6">
                {product.inStock === false ? (
                  <>
                    {/* Out of Stock Message */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                      <p className="text-red-600 font-bold text-lg">❌ Dit product is momenteel uitverkocht</p>
                      <p className="text-red-500 text-sm mt-1">Neem contact op voor beschikbaarheid</p>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full bg-gray-400 text-white text-lg py-6 cursor-not-allowed"
                      disabled
                      data-testid="add-to-cart-button"
                    >
                      Uitverkocht
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-xl py-7 rounded-xl shadow-lg hover:shadow-xl transition-all font-bold"
                      onClick={handleAddToCart}
                      data-testid="add-to-cart-button"
                    >
                      <ShoppingCart className="w-6 h-6 mr-2" />
                      Bestel Nu - €{product.price.toFixed(2).replace('.', ',')}
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                      🚚 Voor 23:00 besteld = morgen in huis
                    </p>
                    
                    {/* Stock Urgency */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                      <p className="text-orange-700 text-sm font-medium">
                        ⚡ Nog maar {Math.floor(Math.random() * 8) + 3} op voorraad - bestel snel!
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Trust Badges - Enhanced */}
              <div className="bg-white rounded-xl border-2 border-[#e8e0d8] p-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs text-slate-700 font-semibold">14 dagen<br />proefslapen</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-warm-brown-50 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Check className="w-6 h-6 text-warm-brown-600" />
                    </div>
                    <p className="text-xs text-slate-700 font-semibold">Gratis<br />verzending</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="text-xs text-slate-700 font-semibold">CE<br />gecertificeerd</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-warm-brown-50 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">🇳🇱</span>
                    </div>
                    <p className="text-xs text-slate-700 font-semibold">Nederlandse<br />klantenservice</p>
                  </div>
                </div>
              </div>
              
              {/* Guarantee Banner */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 mb-6 text-white text-center">
                <p className="font-bold text-lg">💯 100% Tevredenheidsgarantie</p>
                <p className="text-sm opacity-90">Niet tevreden? Geld terug, geen vragen!</p>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-xl p-6 border-2 border-[#e8e0d8]">
                <h3 className="font-bold text-[#5a4a3a] mb-3">Product Details:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Leeftijd:</strong> {product.ageRange}</p>
                  <p><strong>Garantie:</strong> {product.warranty}</p>
                  <p><strong>Certificering:</strong> CE-gecertificeerd</p>
                  <p><strong>Materiaal:</strong> Zacht pluche, hoogwaardig en veilig</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Reviews - Enhanced Design */}
      <section className="py-16 bg-gradient-to-b from-[#fdf8f3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⭐ Klantbeoordelingen
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#5a4a3a] mb-4">
              Wat Klanten Zeggen Over {product.shortName}
            </h2>
            {productReviews.length > 0 && (
              <div className="flex items-center justify-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-gray-900">{product.rating}/5</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>
            )}
          </div>
          
          {productReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productReviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                  data-testid={`product-review-${index}`}
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
                        {/* Trustpilot-style Stars */}
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-4 h-4 flex items-center justify-center ${
                                i < review.rating ? 'bg-green-500' : 'bg-gray-200'
                              }`}
                            >
                              <Star className={`w-3 h-3 ${i < review.rating ? 'fill-white text-white' : 'fill-gray-400 text-gray-400'}`} />
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Review Content */}
                  <h4 className="font-bold text-[#5a4a3a] mb-2">{review.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-lg">Nog geen reviews beschikbaar voor dit product.</p>
              <p className="text-gray-400 mt-2">Wees de eerste om een review te schrijven!</p>
            </div>
          )}
          
          {/* View All Reviews CTA */}
          {productReviews.length > 0 && (
            <div className="text-center mt-10">
              <Link to="/reviews">
                <Button 
                  className="bg-[#8B7355] hover:bg-[#6d5a45] text-white px-8 py-6 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                  data-testid="view-all-product-reviews-btn"
                >
                  Bekijk Alle Reviews →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gradient-to-b from-white to-[#fdf8f3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5a4a3a] mb-12">
            Veelgestelde Vragen
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-white border-2 border-[#e8e0d8] rounded-xl px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[#5a4a3a] hover:text-[#8B7355]">
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

      {/* Related Products */}
      <section className="py-16 bg-gradient-to-b from-[#fdf8f3] to-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5a4a3a] mb-8 text-center">
            Andere Knuffels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => p.id !== product.id).slice(0, 3).map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-xl transition-all border border-[#e8e0d8] bg-white">
                <div className="relative bg-[#faf7f4] p-6">
                  {relatedProduct.badge && (
                    <Badge className="absolute top-4 left-4 bg-[#2d2d2d] text-white">
                      {relatedProduct.badge}
                    </Badge>
                  )}
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">{relatedProduct.shortName}</h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedProduct.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#8B7355]">€{relatedProduct.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold">{relatedProduct.rating}</span>
                    </div>
                  </div>
                  <Link to={`/product/${relatedProduct.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <Button className="w-full bg-[#8B7355] hover:bg-[#6d5a45] text-white" data-testid={`view-product-${relatedProduct.id}`}>
                      Bekijk Product
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsored Content / Ads */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 mb-2 text-center">Advertentie</p>
          <AdMultiplex />
        </div>
      </section>
    </Layout>
  );
};

export default ProductPage;
