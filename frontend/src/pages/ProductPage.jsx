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

  // Create gallery array - main image + gallery images
  const galleryImages = useMemo(() => {
    if (!product) return [];
    const images = [product.image];
    if (product.gallery && product.gallery.length > 0) {
      images.push(...product.gallery);
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

  return (
    <Layout backButtonText="Terug" showPromoBanner={false}>
      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 mb-4">
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
                      <ChevronLeft className="w-6 h-6 text-purple-600" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === galleryImages.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      aria-label="Volgende foto"
                    >
                      <ChevronRight className="w-6 h-6 text-purple-600" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx 
                          ? 'border-purple-600 ring-2 ring-purple-300' 
                          : 'border-gray-200 hover:border-purple-300'
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
                <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
                  {product.name}
                </h1>
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
                <p className="text-xl text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-bold text-purple-900">€{product.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Voordelen:</h3>
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
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Eigenschappen:</h3>
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-8">
                <Button 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
                  onClick={handleAddToCart}
                  data-testid="add-to-cart-button"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  In Winkelwagen - €{product.price.toFixed(2)}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 text-lg py-6"
                  onClick={handleDirectOrder}
                  data-testid="direct-order-button"
                >
                  Direct Bestellen
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-purple-200">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-semibold">14 dagen<br />retour</p>
                </div>
                <div className="text-center">
                  <Check className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-semibold">Gratis<br />verzending</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-semibold">CE<br />gecertificeerd</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
                <h3 className="font-bold text-purple-900 mb-3">Product Details:</h3>
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

      {/* Product Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
            Wat Klanten Zeggen Over {product.shortName}
          </h2>
          {productReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productReviews.map((review) => (
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
          ) : (
            <p className="text-center text-gray-600">Nog geen reviews beschikbaar.</p>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-12">
            Veelgestelde Vragen
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-white border-2 border-purple-100 rounded-xl px-6"
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

      {/* Related Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
            Andere Knuffels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => p.id !== product.id).slice(0, 3).map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-xl transition-all border-2 border-purple-100">
                <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 p-6">
                  {relatedProduct.badge && (
                    <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
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
                  <h3 className="text-xl font-bold text-purple-900 mb-2">{relatedProduct.shortName}</h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedProduct.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-900">€{relatedProduct.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{relatedProduct.rating}</span>
                    </div>
                  </div>
                  <Link to={`/product/${relatedProduct.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" data-testid={`view-product-${relatedProduct.id}`}>
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
