import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../mockData';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Star, ShoppingCart, Filter } from 'lucide-react';
import { trackViewItemList, trackSelectItem } from '../utils/analytics';
import { AdBanner } from '../components/AdSense';

const KnuffelsPage = () => {
  const { addToCart } = useCart();

  // Sort products: in-stock first, out-of-stock at the end
  const sortedProducts = [...products].sort((a, b) => {
    // If both are in stock or both are out of stock, maintain original order
    const aInStock = a.inStock !== false;
    const bInStock = b.inStock !== false;
    if (aInStock === bInStock) return 0;
    // In stock items come first
    return aInStock ? -1 : 1;
  });

  // GA4: Track view_item_list when page loads
  useEffect(() => {
    trackViewItemList(sortedProducts, 'alle_knuffels', 'Alle Knuffels');
  }, []);

  // GA4: Track product click
  const handleProductClick = (product, index) => {
    trackSelectItem(product, index, 'alle_knuffels', 'Alle Knuffels');
  };

  return (
    <Layout showBackButton={true}>
      {/* Hero Section - Brown Theme */}
      <section className="bg-gradient-to-b from-[#f5efe8] via-[#fdf8f3] to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#8B7355]/10 text-[#8B7355] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Onze Collectie
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5a4a3a] mb-4">
            Alle <span className="text-[#8B7355]">Droomvriendjes</span>
          </h1>
          <p className="text-lg text-[#7a6a5a] max-w-2xl mx-auto">
            Ontdek onze complete collectie slaapknuffels met rustgevende lichtjes en geluiden. 
            Perfect voor een betere nachtrust.
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-[#e8e0d8] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-[#7a6a5a]">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Gratis verzending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>14 dagen bedenktijd</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Veilig betalen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Voor 23:00 besteld = morgen in huis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner />
      </div>

      {/* Products Grid - Brown Theme */}
      <section className="py-12 bg-gradient-to-b from-[#fdf8f3] to-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-[#7a6a5a]">
              <span className="font-semibold text-[#5a4a3a]">{sortedProducts.length}</span> producten gevonden
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="products-grid">
            {sortedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#e8e0d8] hover:border-[#8B7355]/30 flex flex-col ${product.inStock === false ? 'opacity-75' : ''}`}
                data-testid={`product-card-${product.id}`}
              >
                {/* Badges */}
                <div className="relative">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-4 py-1.5 text-xs font-bold rounded-full shadow-lg ${
                        product.badge === 'UITVERKOCHT' ? 'bg-gradient-to-r from-gray-500 to-gray-700 text-white' :
                        product.badge === 'BESTSELLER' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' :
                        product.badge === 'NIEUW' ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' :
                        product.badge === 'POPULAIR' ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' :
                        'bg-gradient-to-r from-[#8B7355] to-[#6d5a45] text-white'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {product.inStock !== false && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-red-500 text-white shadow-lg">
                        -50% OP 2E
                      </span>
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <Link to={`/product/${product.id}`} onClick={() => { handleProductClick(product, index); window.scrollTo(0, 0); }}>
                    <div className="relative bg-gradient-to-br from-[#faf6f1] via-[#f5efe8] to-[#efe7dc] p-6 cursor-pointer overflow-hidden aspect-square">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ${product.inStock === false ? 'grayscale' : ''}`}
                      />
                      {product.inStock === false && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">UITVERKOCHT</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
                
                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col bg-white">
                  {/* Title with Price */}
                  <Link to={`/product/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#5a4a3a] group-hover:text-[#8B7355] transition-colors cursor-pointer flex-1 pr-2 line-clamp-2">
                        {product.shortName || product.name}
                      </h3>
                      <div className="text-right flex-shrink-0">
                        <span className="text-sm text-gray-400 line-through block">€{(product.price * 1.3).toFixed(2).replace('.', ',')}</span>
                        <span className="text-xl font-bold text-[#8B7355]">€{product.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#5a4a3a]">{product.rating}</span>
                    <span className="text-xs text-[#8a7a6a]">({product.reviews} reviews)</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-[#7a6a5a] mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>
                  
                  {/* Stock Status */}
                  <div className="mb-3">
                    {product.inStock === false ? (
                      <p className="text-xs text-red-600 font-semibold">✗ Uitverkocht</p>
                    ) : (
                      <p className="text-xs text-green-600">✓ Op voorraad - morgen in huis</p>
                    )}
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
                    {product.inStock === false ? (
                      <Button 
                        className="w-full bg-gray-400 text-white font-semibold cursor-not-allowed"
                        disabled
                      >
                        Uitverkocht
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                        onClick={() => addToCart(product)}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        In Winkelmandje
                      </Button>
                    )}
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
