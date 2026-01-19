import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { AdBanner, AdInArticle } from '../components/AdSense';

const BlogsPage = () => {
  const blogs = [
    {
      id: 7,
      slug: "droomvriendjes-mondriaan-samenwerking",
      title: "Droomvriendjes.nl x Mondriaan: samen werken aan rust in de avond",
      excerpt: "In een druk gezinsleven is tot rust komen niet altijd vanzelfsprekend. Daarom werken Droomvriendjes.nl en Mondriaan samen om gezinnen te ondersteunen met praktische rustmomenten.",
      author: "Team Droomvriendjes",
      date: "19 januari 2025",
      readTime: "8 min",
      category: "Samenwerking",
      image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800",
      featured: true
    },
    {
      id: 1,
      slug: "5-tips-betere-nachtrust-kinderen",
      title: "5 Tips voor een Betere Nachtrust bij Kinderen",
      excerpt: "Ontdek de beste tips om je kind te helpen beter te slapen. Van een vaste slaaproutine tot het creëren van een rustige slaapomgeving.",
      author: "Team Droomvriendjes",
      date: "10 januari 2025",
      readTime: "7 min",
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
      excerpt: "Een goede slaaproutine is essentieel voor kinderen. Lees onze tips voor het creëren van een effectief slaaprituaal.",
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

  // Separate featured blog
  const featuredBlog = blogs.find(b => b.featured);
  const regularBlogs = blogs.filter(b => !b.featured);

  return (
    <Layout backButtonText="Terug naar Home">
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
        {/* Ad Banner Top */}
        <AdBanner className="mb-8" />
        
        {/* Featured Blog - Mondriaan Samenwerking */}
        {featuredBlog && (
          <div className="mb-12">
            <Link to={`/blog/${featuredBlog.slug || featuredBlog.id}`}>
              <Card className="overflow-hidden hover:shadow-2xl transition-all border-2 border-purple-200 group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img 
                      src={featuredBlog.image} 
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
                      {featuredBlog.category}
                    </Badge>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center bg-gradient-to-br from-purple-50 to-white">
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold mb-4 border-purple-200 bg-purple-100 text-purple-800 w-fit">
                      Uitgelicht
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredBlog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredBlog.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredBlog.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularBlogs.slice(0, 6).map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug || blog.id}`}>
              <Card className="overflow-hidden hover:shadow-2xl transition-all border-2 border-purple-100 group h-full">
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
            </Link>
          ))}
        </div>

        {/* In-Article Ad */}
        <AdInArticle />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(3).map((blog) => (
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
    </Layout>
  );
};

export default BlogsPage;
