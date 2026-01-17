import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../mockData';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Star, ShoppingCart, Filter } from 'lucide-react';
import { trackViewItemList, trackSelectItem } from '../utils/analytics';

const KnuffelsPage = () => {
  const { addToCart } = useCart();

  // GA4: Track view_item_list when page loads
  useEffect(() => {
    trackViewItemList(products, 'alle_knuffels', 'Alle Knuffels');
  }, []);

  // GA4: Track product click
  const handleProductClick = (product, index) => {
    trackSelectItem(product, index, 'alle_knuffels', 'Alle Knuffels');
  };

  return (
    <Layout showBackButton={true}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-100 via-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Onze Collectie
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Alle <span className="text-purple-600">Droomvriendjes</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek onze complete collectie slaapknuffels met rustgevende lichtjes en geluiden. 
            Perfect voor een betere nachtrust.
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Gratis verzending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>14 dagen bedenktijd</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Veilig betalen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Voor 23:00 besteld = morgen in huis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{products.length}</span> producten gevonden
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="products-grid">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 flex flex-col"
                data-testid={`product-card-${product.id}`}
              >
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
                  <Link to={`/product/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6 cursor-pointer overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-52 object-contain group-hover:scale-105 transition-transform duration-500"
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
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors cursor-pointer line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">Projectie</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">White Noise</span>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-4 mt-auto">
                    {product.originalPrice > product.price ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-400 line-through">€{product.originalPrice.toFixed(2)}</span>
                        <span className="text-2xl font-bold text-purple-600">€{product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                    )}
                    <p className="text-xs text-green-600 mt-1">✓ Op voorraad</p>
                  </div>
                  
                  {/* Buttons */}
                  <div className="space-y-2">
                    <Link to={`/product/${product.id}`} onClick={() => window.scrollTo(0, 0)} className="block">
                      <Button 
                        variant="outline"
                        className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold"
                      >
                        Bekijk Details
                      </Button>
                    </Link>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                      onClick={() => addToCart(product)}
                      data-testid={`add-to-cart-${product.id}`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      In Winkelmandje
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hulp nodig bij het kiezen?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Neem contact met ons op en we helpen je graag de perfecte Droomvriendje te vinden.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8">
              Neem Contact Op
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default KnuffelsPage;
