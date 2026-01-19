import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { products as allProducts } from '../mockData';

/**
 * ProductSlider Component - Herbruikbare product slider voor landing pagina's
 * Toont alle in-stock producten in een slider op mobiel, grid op desktop
 */
const ProductSlider = ({ onAddToCart, title = "Onze Droomvriendjes", subtitle = "Kies jouw rustmaatje" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get all in-stock products
  const availableProducts = allProducts.filter(p => p.inStock !== false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % availableProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + availableProducts.length) % availableProducts.length);
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">{title}</h2>
          <p className="text-lg text-[#5a7a5a]">{subtitle}</p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {availableProducts.slice(0, 6).map((product) => (
            <Card key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border">
              <div className="relative">
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#2d5a3d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </span>
                )}
                <Link to={`/product/${product.id}`}>
                  <div className="p-6 bg-gradient-to-b from-[#f5f9f5] to-white cursor-pointer hover:from-[#e8f0e8] transition-colors">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-contain mx-auto" />
                  </div>
                </Link>
              </div>
              <CardContent className="p-6">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-bold text-[#2d5a3d] mb-2 hover:underline">{product.name}</h3>
                </Link>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">({product.reviews || 0})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#2d5a3d]">€{product.price}</span>
                  <Button 
                    onClick={() => handleAddToCart(product)} 
                    className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-6"
                  >
                    Bestel nu
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile: Slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {availableProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-2">
                  <Card className="bg-white rounded-3xl overflow-hidden shadow-lg border">
                    <div className="relative">
                      {product.badge && (
                        <span className="absolute top-4 left-4 bg-[#2d5a3d] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                          {product.badge}
                        </span>
                      )}
                      <Link to={`/product/${product.id}`}>
                        <div className="p-6 bg-gradient-to-b from-[#f5f9f5] to-white">
                          <img src={product.image} alt={product.name} className="w-full h-48 object-contain mx-auto" />
                        </div>
                      </Link>
                    </div>
                    <CardContent className="p-6">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xl font-bold text-[#2d5a3d] mb-2 hover:underline">{product.name}</h3>
                      </Link>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">({product.reviews || 0})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#2d5a3d]">€{product.price}</span>
                        <Button 
                          onClick={() => handleAddToCart(product)} 
                          className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-6"
                        >
                          Bestel nu
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors z-20"
            aria-label="Vorige product"
          >
            <ChevronLeft className="w-6 h-6 text-[#2d5a3d]" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors z-20"
            aria-label="Volgende product"
          >
            <ChevronRight className="w-6 h-6 text-[#2d5a3d]" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {availableProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-[#2d5a3d]' : 'bg-[#c5d9c8]'
                }`}
                aria-label={`Ga naar product ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bekijk alle link */}
        <div className="text-center mt-10">
          <Link 
            to="/knuffels" 
            className="inline-flex items-center text-[#2d5a3d] font-semibold hover:underline"
          >
            Bekijk alle producten
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
