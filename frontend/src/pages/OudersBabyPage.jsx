import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, Shield, Moon, Heart, Volume2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';

const OudersBabyPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  const selectedProductIds = [3, 2, 11]; // Teddy, Schaap, Panda - Bestsellers
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id))
    .map(p => ({
      ...p,
      subtitle: p.id === 3 ? "Meest gekozen" : p.id === 2 ? "Zacht en knuffelbaar" : "Super rustgevend",
      landingBadge: p.id === 3 ? "BESTSELLER #1" : p.id === 2 ? "BESTSELLER #2" : "BESTSELLER #3",
    }));

  const reviews = [
    { name: "Lisa", context: "Moeder van Sem (8 maanden)", rating: 5, text: "Sem sliep nooit langer dan 2 uur achter elkaar. Sinds we het Droomvriendje gebruiken, slaapt hij regelmatig 5-6 uur door.", product: "Schaap" },
    { name: "Mark", context: "Vader van tweeling (6 maanden)", rating: 5, text: "Met een tweeling is slapen een uitdaging. De Droomvriendjes helpen enorm bij het creëren van een vast slaapritueel.", product: "Leeuw (2x)" },
    { name: "Emma", context: "Moeder van Olivia (4 maanden)", rating: 5, text: "Als eerste-keer-moeder was ik wanhopig door slaapgebrek. Olivia valt nu binnen 15 minuten in slaap.", product: "Schaap Liggend" }
  ];

  const faqs = [
    { question: "Is dit veilig voor mijn baby?", answer: "Ja, alle Droomvriendjes zijn CE-gecertificeerd en voldoen aan de strengste Europese veiligheidsnormen. De materialen zijn hypoallergeen en vrij van schadelijke stoffen." },
    { question: "Vanaf welke leeftijd kan ik dit gebruiken?", answer: "Droomvriendjes zijn geschikt vanaf 0 maanden. Voor baby's onder de 6 maanden adviseren we de knuffel naast het bedje te plaatsen." },
    { question: "Helpt dit echt bij doorslapen?", answer: "Veel ouders melden dat hun baby beter doorslaapt. De combinatie van white noise en zacht licht helpt bij het creëren van een consistente slaapomgeving." },
    { question: "Hoe lang gaat de batterij mee?", answer: "De batterijen gaan gemiddeld 4-6 weken mee bij dagelijks gebruik. De knuffel schakelt automatisch uit na 30 of 60 minuten." }
  ];

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fdf8] via-white to-[#f5f9f5]">
      <CartSidebar />
      
      {/* Floating clouds decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/40 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-40 right-20 w-48 h-20 bg-[#e8f5e9]/50 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-16 bg-white/30 rounded-full blur-2xl animate-pulse" style={{animationDuration: '6s'}}></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#e8f5e9] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <img src="https://customer-assets.emergentagent.com/job_plush-revamp/artifacts/npuc23bl_lgoo%20ads%20%281%29.png" alt="Droomvriendjes.nl" className="h-14 w-auto" />
            </Link>
            <a href="https://www.droomvriendjes.nl/#producten" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-6 py-2 shadow-lg shadow-[#2d5a3d]/20 transition-all hover:scale-105">
                Bekijk knuffels
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Cloud Nest Style */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-[#e8f5e9] rounded-full px-5 py-2 text-sm text-[#2d5a3d] mb-8 shadow-sm">
              <Moon className="w-4 h-4" />
              Speciaal voor baby's (0-12 maanden)
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2d5a3d] mb-6 leading-tight" style={{fontFamily: 'Quicksand, sans-serif'}}>
              Slaap zacht,<br />
              <span className="text-[#4a8a5a]">kleine dromer</span>
            </h1>
            
            <p className="text-xl text-[#5a7a5a] mb-10 leading-relaxed max-w-2xl mx-auto">
              De veiligste slaapvriendjes voor de allerkleinsten. Rustgevende geluiden en zacht licht voor betere nachten.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="#producten">
                <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-10 py-6 text-lg shadow-xl shadow-[#2d5a3d]/30 transition-all hover:scale-105 hover:shadow-2xl">
                  Ontdek Droomvriendjes
                </Button>
              </a>
              <span className="text-sm text-[#7a9a7a]">14 dagen retourgarantie</span>
            </div>
          </div>

          {/* Floating Product Cards */}
          <div className="relative max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {landingProducts.map((product, idx) => (
                <div 
                  key={product.id} 
                  className={`transform transition-all duration-500 hover:scale-105 ${idx === 1 ? '-mt-8' : 'mt-4'}`}
                >
                  <Card className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(45,90,61,0.15)] border-0 overflow-hidden">
                    <div className="bg-gradient-to-b from-[#f5f9f5] to-white p-6 flex items-center justify-center aspect-square">
                      <img src={product.image} alt={product.name} className="w-full h-auto object-contain max-h-[150px]" />
                    </div>
                    <CardContent className="p-4 text-center">
                      <p className="font-semibold text-[#2d5a3d] text-sm">{product.shortName}</p>
                      <p className="text-[#2d5a3d] font-bold">€{product.price.toFixed(2).replace('.', ',')}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L48 108C96 96 192 72 288 60C384 48 480 48 576 54C672 60 768 72 864 78C960 84 1056 84 1152 78C1248 72 1344 60 1392 54L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "CE Gecertificeerd", sublabel: "100% veilig" },
              { icon: Heart, label: "Hypoallergeen", sublabel: "Zachte materialen" },
              { icon: Volume2, label: "White Noise", sublabel: "Rustgevend geluid" },
              { icon: Moon, label: "Zacht Licht", sublabel: "Voor 's nachts" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#f8fdf8] hover:bg-[#e8f5e9] transition-colors">
                <div className="w-14 h-14 rounded-full bg-[#2d5a3d] flex items-center justify-center mb-3 shadow-lg shadow-[#2d5a3d]/20">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-[#2d5a3d]">{item.label}</p>
                <p className="text-sm text-[#7a9a7a]">{item.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics - Soft Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
              Je bent niet alleen
            </h2>
            <p className="text-[#5a7a5a] text-lg max-w-2xl mx-auto">
              Bijna alle ouders van baby's ervaren slaapproblemen. Een vast slaapritueel kan het verschil maken.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "76%", label: "van baby's slaapt niet door voor 12 maanden" },
              { stat: "4-6 uur", label: "gemiddelde slaap voor nieuwe ouders" },
              { stat: "86%", label: "meldt verbetering met Droomvriendjes" }
            ].map((item, idx) => (
              <Card key={idx} className="rounded-[2rem] border-0 shadow-[0_10px_40px_-10px_rgba(45,90,61,0.1)] p-8 text-center bg-gradient-to-b from-white to-[#f8fdf8]">
                <p className="text-5xl font-bold text-[#2d5a3d] mb-3" style={{fontFamily: 'Quicksand, sans-serif'}}>{item.stat}</p>
                <p className="text-[#5a7a5a]">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews - Horizontal Scroll */}
      <section className="py-20 bg-[#f8fdf8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
              Wat andere ouders zeggen
            </h2>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-[#5a7a5a]">4.7 gemiddeld (500+ reviews)</span>
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {reviews.map((review, idx) => (
              <Card key={idx} className="flex-shrink-0 w-[350px] rounded-[2rem] border-0 shadow-[0_10px_40px_-10px_rgba(45,90,61,0.1)] p-8 snap-center bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2d5a3d] to-[#4a8a5a] flex items-center justify-center text-white font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2d5a3d]">{review.name}</p>
                    <p className="text-sm text-[#7a9a7a]">{review.context}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-[#4a6a4a] italic leading-relaxed">"{review.text}"</p>
                <p className="text-sm text-[#7a9a7a] mt-4">Product: {review.product}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="producten" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <a href="https://www.droomvriendjes.nl/#producten" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
                Kies het perfecte Droomvriendje
              </h2>
            </a>
            <p className="text-[#5a7a5a] text-lg">Alle knuffels zijn veilig vanaf 0 maanden</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {landingProducts.map((product) => (
              <Card key={product.id} className="rounded-[2rem] border-0 shadow-[0_20px_60px_-15px_rgba(45,90,61,0.15)] overflow-hidden group hover:shadow-[0_30px_80px_-15px_rgba(45,90,61,0.25)] transition-all duration-300">
                <Link to={`/product/${product.id}`}>
                  <div className="bg-gradient-to-b from-[#f5f9f5] to-white p-8 flex items-center justify-center aspect-square group-hover:from-[#e8f5e9] transition-colors">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-contain max-h-[180px] group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </Link>
                <CardContent className="p-6 text-center">
                  <span className="inline-block bg-[#e8f5e9] text-[#2d5a3d] text-xs font-semibold px-3 py-1 rounded-full mb-3">{product.landingBadge}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#2d5a3d] text-xl mb-1 hover:text-[#4a8a5a] transition-colors">{product.shortName}</h3>
                  </Link>
                  <p className="text-sm text-[#7a9a7a] mb-4">{product.subtitle}</p>
                  <p className="text-2xl font-bold text-[#2d5a3d] mb-4">€{product.price.toFixed(2).replace('.', ',')}</p>
                  <Button onClick={() => handleAddToCart(product)} className="w-full bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full py-5 shadow-lg shadow-[#2d5a3d]/20 transition-all hover:scale-[1.02]">
                    In winkelwagen
                  </Button>
                  <p className="text-xs text-[#7a9a7a] mt-3">Gratis verzending · 14 dagen retour</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#f8fdf8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
              Veelgestelde vragen
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white rounded-2xl px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-[#2d5a3d] hover:text-[#4a8a5a] py-6">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#5a7a5a] pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d5a3d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-2xl font-bold mb-4 block" style={{fontFamily: 'Quicksand, sans-serif'}}>🧸 Droomvriendjes</span>
              <p className="text-[#a8d4a8] text-sm">Schaesbergerweg 103<br/>6415 AD Heerlen<br/>KVK: 9921083</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Navigatie</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/#producten" className="hover:text-white transition-colors">Alle producten</Link></li>
                <li><Link to="/ouders-baby" className="hover:text-white transition-colors">Ouders van baby's</Link></li>
                <li><Link to="/ouders-peuters" className="hover:text-white transition-colors">Ouders van peuters</Link></li>
                <li><Link to="/ouders-extra-behoeften" className="hover:text-white transition-colors">Extra behoeften</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Hulp</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/retourneren" className="hover:text-white transition-colors">Retourneren</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Betalen</h3>
              <p className="text-[#a8d4a8] text-sm">iDEAL • Klarna<br/>PayPal • Creditcard</p>
            </div>
          </div>
          <div className="border-t border-[#3d7a4d] pt-8 text-center">
            <p className="text-[#a8d4a8] text-sm">© 2025 Droomvriendjes. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OudersBabyPage;
