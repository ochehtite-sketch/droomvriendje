import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Clock, Star, CheckCircle, Moon, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../mockData';
import Footer from '../components/Footer';
import ProductSlider from '../components/ProductSlider';

const RustmomentOudersPage = () => {
  const { addToCart, setIsCartOpen } = useCart();
  
  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };
  
  // Filter in-stock products and select featured ones
  const inStockProducts = products.filter(p => !p.outOfStock);
  const featuredProductIds = [7, 11, 12];
  const featuredProducts = featuredProductIds
    .map(id => inStockProducts.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🧸</span>
              <span className="text-xl font-bold text-purple-900">Droomvriendjes</span>
            </Link>
            <Link to="/checkout" className="relative p-2 text-purple-600 hover:text-purple-800">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">✨</div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce">🌙</div>
          <div className="absolute bottom-10 left-1/4 text-4xl animate-pulse">💜</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6">
            Voor Ouders die Even Op Adem Willen Komen
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Jouw Rustmoment <br />
            <span className="text-yellow-300">Begint Hier</span>
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Als ouder geef je elke dag je beste. Maar vergeet niet: je kunt alleen goed voor anderen zorgen 
            als je ook voor jezelf zorgt. Een Droomvriendje helpt je kind rustig worden, 
            zodat jij even kunt ontspannen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/knuffels" 
              className="px-8 py-4 bg-yellow-400 text-purple-900 rounded-full font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
            >
              Bekijk Onze Knuffels
            </Link>
            <a 
              href="#tips" 
              className="px-8 py-4 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-all"
            >
              Ontdek Rust Tips
            </a>
          </div>
        </div>
      </section>

      {/* Waarom Rust Belangrijk Is */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              Waarom Rust Zo Belangrijk Is
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Onderzoek toont aan dat ouders die regelmatig rustmomenten nemen, 
              beter in staat zijn om geduldig en liefdevol te blijven.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">Meer Geduld</h3>
              <p className="text-gray-600">
                Een uitgeruste ouder heeft meer geduld en kan beter omgaan met de uitdagingen van het ouderschap.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">Betere Verbinding</h3>
              <p className="text-gray-600">
                Wanneer je zelf ontspannen bent, kun je beter afstemmen op de behoeften van je kind.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Moon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">Gezonder Gezin</h3>
              <p className="text-gray-600">
                Rust voor ouders betekent een harmonieuzere sfeer in huis voor het hele gezin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Sectie */}
      <section id="tips" className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              5 Tips voor Jouw Rustmoment
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Plan het in",
                description: "Zet elke dag een vast rustmoment in je agenda, al is het maar 10 minuten."
              },
              {
                icon: <Moon className="w-6 h-6" />,
                title: "Gebruik hulpmiddelen",
                description: "Een Droomvriendje houdt je kind rustig bezig terwijl jij even pauzeert."
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Laat de schuldgevoel los",
                description: "Rust nemen is geen luxe, het is noodzaak. Je verdient het."
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "Adem bewust",
                description: "Neem 5 diepe ademhalingen wanneer je gestrest bent. Het helpt direct."
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Vraag om hulp",
                description: "Het is oké om hulp te vragen. Samen opvoeden is sterker opvoeden."
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Vier kleine momenten",
                description: "Een kopje thee, een warm bad, een kort wandelingetje - het telt allemaal."
              }
            ].map((tip, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe Droomvriendjes Helpt */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-purple-900 mb-6">
                Hoe Droomvriendjes Jou Helpt
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Onze knuffels zijn ontworpen om kinderen te kalmeren met rustgevende geluiden 
                en een zacht nachtlampje. Terwijl je kind zich veilig en geborgen voelt, 
                kun jij even op adem komen.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Rustgevende hartslag en witte ruis geluiden",
                  "Zacht nachtlampje voor geborgenheid",
                  "Timer functie voor automatisch uitschakelen",
                  "Extra zacht en knuffelbaar materiaal"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/knuffels" 
                className="inline-flex items-center mt-8 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Bekijk Alle Knuffels
                <span className="ml-2">→</span>
              </Link>
            </div>

            <div className="bg-purple-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🧸</div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  "Eindelijk even rust"
                </h3>
                <p className="text-gray-600 italic mb-4">
                  "Sinds we een Droomvriendje hebben, valt onze dochter veel sneller in slaap. 
                  Dat geeft mij eindelijk even tijd voor mezelf. Echt een aanrader!"
                </p>
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-purple-600 mt-2">- Marieke, moeder van Luna (3)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Producten Sectie */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              Onze Favorieten voor Rustmomenten
            </h2>
            <p className="text-lg text-gray-600">
              Deze Droomvriendjes zijn het meest geliefd bij ouders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-purple-900 text-sm font-bold rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">€{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Toevoegen</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/knuffels" 
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-colors"
            >
              Bekijk Alle Producten
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Sectie */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klaar voor Jouw Rustmoment?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Geef jezelf de rust die je verdient. Een Droomvriendje helpt je kind kalmeren, 
            zodat jij even op adem kunt komen.
          </p>
          <Link 
            to="/knuffels" 
            className="inline-flex items-center px-8 py-4 bg-yellow-400 text-purple-900 rounded-full font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
          >
            Bestel Nu met Gratis Verzending
            <span className="ml-2">→</span>
          </Link>
          <p className="text-purple-200 text-sm mt-4">
            ✓ 14 dagen niet goed, geld terug garantie
          </p>
        </div>
      </section>

      <Footer variant="green" />
    </div>
  );
};

export default RustmomentOudersPage;
