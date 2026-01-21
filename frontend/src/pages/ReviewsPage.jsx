import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Star, Filter, ChevronDown } from 'lucide-react';
import { reviews, products } from '../mockData';
import Layout from '../components/Layout';

const ReviewsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Get unique products from reviews
  const productNames = [...new Set(reviews.map(r => r.product))];

  // Filter reviews
  const filteredReviews = reviews
    .filter(review => selectedProduct === 'all' || review.product === selectedProduct)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default to original order (recent)
    });

  // Calculate stats
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(r => r.rating === rating).length
  );

  return (
    <Layout backButtonText="Terug naar Home">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#fdf8f3] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trustpilot Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-md border border-gray-100 mb-6">
              <span className="text-green-500 font-bold text-lg">★</span>
              <span className="text-gray-700 font-semibold">Trustpilot</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#5a4a3a] mb-4">
              Klantbeoordelingen
            </h1>
            
            {/* Rating Summary */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="text-3xl font-bold text-gray-900">{avgRating}/5</span>
            </div>
            
            {/* Customer Avatars */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {[1, 5, 8, 9, 12].map((img) => (
                  <img 
                    key={img}
                    src={`https://i.pravatar.cc/40?img=${img}`} 
                    alt="Klant" 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                  />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-[#8B7355] flex items-center justify-center text-white text-xs font-bold">
                  +{reviews.length}
                </div>
              </div>
            </div>
            
            <p className="text-lg text-gray-600">
              Gebaseerd op <span className="font-bold text-gray-900">{reviews.length}+</span> geverifieerde reviews
            </p>
          </div>
        </div>
      </div>

      {/* Rating Breakdown & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Rating Breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-4">
              <h3 className="font-bold text-[#5a4a3a] mb-4">Beoordelingen</h3>
              
              {/* Rating Bars */}
              <div className="space-y-3 mb-6">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600 w-12">{rating} ster</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-amber-400 h-2.5 rounded-full transition-all"
                        style={{ width: `${(ratingCounts[index] / reviews.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-8">{ratingCounts[index]}</span>
                  </div>
                ))}
              </div>

              {/* Product Filter */}
              <h3 className="font-bold text-[#5a4a3a] mb-3">Filter op product</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedProduct('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedProduct === 'all' 
                      ? 'bg-[#8B7355] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Alle producten ({reviews.length})
                </button>
                {productNames.map((product) => (
                  <button
                    key={product}
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedProduct === product 
                        ? 'bg-[#8B7355] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {product} ({reviews.filter(r => r.product === product).length})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">{filteredReviews.length}</span> reviews gevonden
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sorteer op:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="recent">Meest recent</option>
                  <option value="rating">Hoogste beoordeling</option>
                </select>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              {filteredReviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                  data-testid={`review-${review.id}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <img 
                      src={`https://i.pravatar.cc/56?img=${(review.id % 30) + 15}`}
                      alt={review.name}
                      className="w-14 h-14 rounded-full flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{review.name}</span>
                            {review.verified && (
                              <span className="text-green-500 text-sm flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
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
                                  className={`w-5 h-5 flex items-center justify-center ${
                                    i < review.rating ? 'bg-green-500' : 'bg-gray-200'
                                  }`}
                                >
                                  <Star className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-white text-white' : 'fill-gray-400 text-gray-400'}`} />
                                </div>
                              ))}
                            </div>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Review Title */}
                      <h3 className="font-bold text-[#5a4a3a] text-lg mb-2">{review.title}</h3>
                      
                      {/* Review Text */}
                      <p className="text-gray-600 leading-relaxed mb-3">{review.text}</p>
                      
                      {/* Product Tag */}
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-[#f5efe8] text-[#8B7355] px-3 py-1.5 rounded-full text-sm font-medium">
                          🧸 {review.product}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#8B7355] to-[#6d5a45] text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Word ook een tevreden klant! 🎉
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Sluit je aan bij 10.000+ ouders die kiezen voor Droomvriendjes
          </p>
          <Link to="/knuffels">
            <Button 
              size="lg" 
              className="bg-white text-[#8B7355] hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-full"
              data-testid="shop-cta-btn"
            >
              🛒 Bekijk Onze Knuffels
            </Button>
          </Link>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm opacity-80 flex-wrap">
            <span>✓ Gratis verzending</span>
            <span>✓ 14 dagen retour</span>
            <span>✓ CE-gecertificeerd</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewsPage;
