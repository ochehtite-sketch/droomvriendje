import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Footer from '../components/Footer';

const OverOnsPage = () => {
  const stats = [
    { number: "1000+", label: "Tevreden gezinnen" },
    { number: "100%", label: "Liefde & zorg" },
    { number: "24/7", label: "Rust & geborgenheid" },
    { number: "5★", label: "Gemiddelde beoordeling" }
  ];

  const features = [
    { icon: "🌙", title: "Rustgevend Licht", description: "Zachte kleuren die helpen bij het tot rust komen" },
    { icon: "🎵", title: "Kalmerende Muziek", description: "Speciaal geselecteerde geluiden voor betere slaap" },
    { icon: "🤗", title: "Zachte Knuffel", description: "Veilig en comfortabel voor alle leeftijden" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🧸</span>
              <span className="text-xl font-bold text-white">Droomvriendjes</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/knuffels" className="text-white/90 hover:text-white font-medium transition-colors">
                Bekijk Knuffels
              </Link>
              <Link to="/checkout" className="relative p-2 text-white hover:text-white/80">
                <ShoppingCart className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Hero Header */}
          <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 px-8 py-16 md:px-12 md:py-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-10 text-8xl opacity-10 animate-bounce">✨</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ons Verhaal</h1>
            <p className="text-xl text-purple-100">Van persoonlijke ervaring naar missie</p>
          </div>

          {/* Content */}
          <div className="px-8 py-12 md:px-12 md:py-16">
            
            {/* Story Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 pb-3 border-b-4 border-gradient-to-r from-purple-500 to-indigo-500 inline-block relative">
                Hoe het begon
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded"></span>
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Droomvriendjes is ontstaan uit persoonlijke ervaring met slaapproblemen bij jonge kinderen. 
                Als ouders hebben we gezien hoe moeilijk het kan zijn wanneer je kind moeite heeft met in slaap vallen, 
                overprikkeld is of last heeft van angst.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We weten hoe het voelt om in het midden van de nacht naast een huilend kindje te zitten, hopend dat er 
                iets is dat kan helpen. Die momenten van frustratie en bezorgdheid vormden de basis voor wat 
                Droomvriendjes nu is.
              </p>
            </section>

            {/* Story Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 relative inline-block">
                Onze Ontwikkeling
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded"></span>
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                We begonnen met onderzoek naar wat kinderen echt helpt om tot rust te komen. Dit leidde tot de 
                ontwikkeling van onze unieke knuffels met kalmerende licht- en muziekfuncties.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Elk detail is zorgvuldig ontworpen: van het zachte materiaal tot de rustgevende kleuren van het licht, 
                en van de selectie van kalmerende geluiden tot de gebruiksvriendelijke bediening voor vermoeide ouders.
              </p>
            </section>

            {/* Family Image Section */}
            <section className="mb-12 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://i.imgur.com/8ggyilD.jpg" 
                alt="Ons gezin - de inspiratie achter Droomvriendjes"
                className="w-full h-auto object-cover"
              />
              <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 px-8 py-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-3">Ons gezin, onze inspiratie</h3>
                <p className="text-purple-100 text-lg leading-relaxed">
                  De ervaring met onze eigen kinderen vormde de basis voor Droomvriendjes. 
                  Elke slapeloze nacht motiveerde ons om een oplossing te vinden die écht werkt.
                </p>
              </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-transparent hover:border-purple-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </section>

            {/* Story Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 relative inline-block">
                Wat ons drijft
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded"></span>
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Inmiddels helpen we meer dan 1000+ gezinnen met betere nachten. Elke positieve reactie van ouders 
                die eindelijk weer een goede nachtrust krijgen, motiveert ons om door te gaan.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We geloven dat goed slapen essentieel is voor de ontwikkeling van kinderen én het welzijn van het 
                hele gezin. Onze Droomvriendjes zijn meer dan alleen knuffels – ze zijn betrouwbare metgezellen 
                die kinderen helpen om zich veilig en geborgen te voelen.
              </p>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center border-2 border-gray-100 hover:border-purple-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <span className="text-5xl md:text-6xl block mb-5">{feature.icon}</span>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </section>

            {/* Mission Box */}
            <section className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 text-9xl opacity-10">💙</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-5 relative z-10">Onze Missie</h3>
              <p className="text-lg text-purple-100 leading-relaxed relative z-10">
                We blijven ons inzetten om gezinnen te helpen met producten die echt verschil maken. 
                Want we weten uit eigen ervaring: een goed uitgeruste ouder en een gelukkig, uitgerust kind – 
                dat is waar het allemaal om draait.
              </p>
            </section>

            {/* CTA */}
            <section className="mt-12 text-center">
              <Link 
                to="/knuffels"
                className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-purple-600 hover:to-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Bekijk Onze Droomvriendjes
              </Link>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OverOnsPage;
