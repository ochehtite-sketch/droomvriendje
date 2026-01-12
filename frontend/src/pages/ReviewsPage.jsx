import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Moon, ArrowLeft, Star } from 'lucide-react';
import { reviews } from '../mockData';

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <Moon className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-900">OujiKidz</span>
            </Link>
            <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Terug naar Home</Button></Link>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Klantbeoordelingen</h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold">4.5/5.0</span>
          </div>
          <p className="text-xl opacity-90">Gebaseerd op 500+ geverifieerde reviews</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="border-2 border-purple-100 hover:shadow-lg transition-all">
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
                <h3 className="font-bold text-purple-900 mb-2">{review.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{review.text}</p>
                <div className="flex items-center justify-between text-sm border-t pt-3">
                  <span className="font-semibold text-gray-700">{review.name}</span>
                  <span className="text-gray-500">{review.date}</span>
                </div>
                <div className="mt-2">
                  <Badge className="bg-purple-100 text-purple-900 text-xs">{review.product}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Sluit Je Aan Bij 1000+ Tevreden Ouders</h2>
          <p className="text-xl mb-6">Ontdek waarom zo veel gezinnen kiezen voor OujiKidz</p>
          <Link to="/"><Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">Bekijk Onze Knuffels</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;