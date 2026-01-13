import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Moon, ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Tips voor een Betere Nachtrust bij Kinderen",
      excerpt: "Ontdek de beste tips om je kind te helpen beter te slapen. Van een vaste slaapro utine tot het creëren van een rustige slaapomgeving.",
      author: "Team Droomvriendjes",
      date: "10 januari 2025",
      readTime: "5 min",
      category: "Slaaptips",
      image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800"
    },
    {
      id: 2,
      title: "Hoe Helpen Kalmerende Knuffels bij Stress?",
      excerpt: "Leer hoe onze kalmerende knuffels met licht en muziek wetenschappelijk bewezen helpen bij het verminderen van stress en angst bij kinderen.",
      author: "Dr. Sarah de Vries",
      date: "5 januari 2025",
      readTime: "7 min",
      category: "Wetenschap",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800"
    },
    {
      id: 3,
      title: "Hoogsensitiviteit bij Kinderen: Wat Je Moet Weten",
      excerpt: "Alles over hoogsensitieve kinderen en hoe je ze kunt helpen om beter om te gaan met prikkels en emoties in het dagelijks leven.",
      author: "Emma Janssen",
      date: "28 december 2024",
      readTime: "6 min",
      category: "Opvoeding",
      image: "https://images.unsplash.com/photo-1587616211892-54b471a7eeae?w=800"
    },
    {
      id: 4,
      title: "De Wetenschap Achter Diepe Druk Stimulatie",
      excerpt: "Ontdek hoe diepe druk stimulatie werkt en waarom het zo effectief is bij het kalmeren van kinderen en volwassenen.",
      author: "Prof. Mark Hendriksen",
      date: "20 december 2024",
      readTime: "8 min",
      category: "Wetenschap",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800"
    },
    {
      id: 5,
      title: "Slaaprituals: Hoe Creëer Je Een Rustgevende Routine?",
      excerpt: "Een goede slaaproutine is essentieel voor kinderen. Lees onze tips voor het creëren van een effectief slaaprit uaal.",
      author: "Lisa van Dam",
      date: "15 december 2024",
      readTime: "5 min",
      category: "Slaaptips",
      image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800"
    },
    {
      id: 6,
      title: "ADHD en Slaapproblemen: Wat Ouders Moeten Weten",
      excerpt: "Kinderen met ADHD hebben vaak moeite met slapen. Ontdek praktische tips en oplossingen om je kind te helpen.",
      author: "Team Droomvriendjes",
      date: "10 december 2024",
      readTime: "6 min",
      category: "Opvoeding",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" alt="Droomvriendjes" className="h-20 md:h-24 w-auto" />
                
            </Link>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Droomvriendjes Blog</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Tips, advies en verhalen over betere nachtrust, kinderslaap en welzijn
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-2xl transition-all border-2 border-purple-100 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
                  {blog.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                    Lees Meer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Blijf Op De Hoogte</h2>
          <p className="text-lg mb-8 opacity-90">
            Ontvang de nieuwste blogs, tips en aanbiedingen direct in je inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Je email adres"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Inschrijven
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;