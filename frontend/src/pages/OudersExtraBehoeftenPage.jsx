import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, Brain, Heart, Eye, Hand, Volume2, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';

const OudersExtraBehoeftenPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  const selectedProductIds = [11, 7, 2];
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id))
    .map(p => ({
      ...p,
      subtitle: p.id === 11 ? "Zeer rustgevend" : p.id === 7 ? "Neutrale kleuren" : "Extra zacht",
      landingBadge: p.id === 11 ? "AANBEVOLEN ADHD" : p.id === 7 ? "AANBEVOLEN AUTISME" : "AANBEVOLEN HSP",
    }));

  const reviews = [
    { name: "Marloes", context: "Moeder van Thijs (6 jaar, ADHD)", rating: 5, text: "Thijs kon nooit stoppen met bewegen, ook in bed niet. Het Droomvriendje helpt hem om te focussen op het licht en de geluiden. Hij valt nu veel sneller in slaap.", product: "Panda" },
    { name: "Johan", context: "Vader van Emma (5 jaar, autisme)", rating: 5, text: "Emma heeft veel structuur nodig. Het Droomvriendje is nu onderdeel van haar vaste routine. Dezelfde geluiden, hetzelfde licht. Dat geeft haar rust.", product: "Beer Projector" },
    { name: "Annemiek", context: "Moeder van Lotte (4 jaar, HSP)", rating: 5, text: "Lotte voelt alles zo intens. Nu knuffelt ze haar schaapje en het zachte materiaal kalmeert haar. Het is alsof het schaapje al haar zorgen absorbeert.", product: "Schaap" }
  ];

  const faqs = [
    { question: "Is dit geschikt voor kinderen met ADHD?", answer: "Veel ouders van kinderen met ADHD melden positieve ervaringen. De combinatie van white noise en zacht licht kan helpen om de overactieve geest tot rust te brengen. De 14-dagen retourgarantie maakt het risico-vrij om te proberen." },
    { question: "Helpt dit bij kinderen met autisme?", answer: "Droomvriendjes kunnen helpen bij kinderen met autisme die baat hebben bij voorspelbaarheid en routine. Het vaste ritueel, de bekende geluiden en het voorspelbare licht kunnen rust bieden." },
    { question: "Mijn kind is hoogsensitief. Is dit niet te veel prikkels?", answer: "Droomvriendjes zijn juist ontworpen om prikkels te verminderen. De white noise maskeert onverwachte geluiden en het zachte, constante licht is rustgevender dan wisselende lichtbronnen." },
    { question: "Vervangt dit therapie of behandeling?", answer: "Nee, Droomvriendjes is geen medisch hulpmiddel en vervangt geen professionele behandeling. Het is een ondersteunend middel dat kan helpen bij het slaapproces." }
  ];

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <CartSidebar />

      {/* Header - Clean & Structured */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <img src="https://customer-assets.emergentagent.com/job_plush-revamp/artifacts/npuc23bl_lgoo%20ads%20%281%29.png" alt="Droomvriendjes.nl" className="h-14 w-auto" />
            </Link>
            <a href="https://www.droomvriendjes.nl/#producten" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-md px-6 py-2 transition-colors">
                Bekijk producten
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Full Width Calm */}
      <section className="relative bg-gradient-to-b from-[#e8f0e8] to-[#fafafa] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-md px-4 py-2 text-sm text-[#2d5a3d] mb-6">
                <Shield className="w-4 h-4" />
                Voor kinderen met ADHD, autisme of hoogsensitiviteit
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight" style={{fontFamily: 'Quicksand, sans-serif'}}>
                Rust en regelmaat voor prikkelgevoelige kinderen
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Je kind ervaart de wereld anders. Intenser. Een veilige haven in een drukke wereld begint met een vast slaapritueel.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <a href="#producten">
                  <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-md px-8 py-6 text-lg transition-colors">
                    Ontdek Droomvriendjes
                  </Button>
                </a>
                <Button variant="outline" className="border-[#2d5a3d] text-[#2d5a3d] rounded-md px-8 py-6 text-lg hover:bg-[#f5f9f5]">
                  14 dagen proberen
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Card className="rounded-lg border border-gray-200 shadow-sm overflow-hidden max-w-sm w-full">
                <div className="bg-[#f5f9f5] p-8 flex items-center justify-center">
                  <img src={landingProducts[0]?.image} alt="Panda" className="w-full h-auto object-contain max-h-[250px]" />
                </div>
                <CardContent className="p-6 bg-white">
                  <p className="text-sm text-[#7a9a7a] mb-1">Aanbevolen bij ADHD</p>
                  <h3 className="font-bold text-[#2d5a3d] text-xl mb-2">Panda Droomvriendje</h3>
                  <p className="text-2xl font-bold text-[#2d5a3d]">€59,95</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Section - Bento Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
              We begrijpen de uitdagingen
            </h2>
            <p className="text-[#5a7a5a] max-w-2xl">
              Kinderen met ADHD, autisme of hoogsensitiviteit ervaren slaap vaak anders. Wat voor andere kinderen werkt, werkt niet altijd voor jouw kind.
            </p>
          </div>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ADHD - Large Card */}
            <Card className="md:col-span-2 rounded-lg border border-gray-200 p-8 hover:border-[#2d5a3d] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#f5f9f5] flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-[#2d5a3d]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2d5a3d] text-xl mb-2">ADHD</h3>
                  <p className="text-[#5a7a5a] mb-4">Het brein blijft actief, ook als het lichaam moe is. Gedachten racen en stilliggen is bijna onmogelijk.</p>
                  <p className="text-sm text-[#7a9a7a] bg-[#f5f9f5] px-4 py-2 rounded-md inline-block">White noise kan helpen om het brein iets te geven om op te focussen.</p>
                </div>
              </div>
            </Card>
            
            {/* Autisme */}
            <Card className="rounded-lg border border-gray-200 p-6 hover:border-[#2d5a3d] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#f5f9f5] flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 text-[#2d5a3d]" />
              </div>
              <h3 className="font-bold text-[#2d5a3d] text-lg mb-2">Autisme</h3>
              <p className="text-sm text-[#5a7a5a]">Veranderingen in routine kunnen het inslapen verstoren. Voorspelbaarheid is essentieel.</p>
            </Card>
            
            {/* HSP */}
            <Card className="rounded-lg border border-gray-200 p-6 hover:border-[#2d5a3d] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#f5f9f5] flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-[#2d5a3d]" />
              </div>
              <h3 className="font-bold text-[#2d5a3d] text-lg mb-2">Hoogsensitiviteit (HSP)</h3>
              <p className="text-sm text-[#5a7a5a]">Elk geluid, elke verandering wordt intens ervaren. De dag kan overweldigend zijn.</p>
            </Card>
            
            {/* Disclaimer */}
            <Card className="md:col-span-2 rounded-lg border border-[#2d5a3d]/20 bg-[#f5f9f5] p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#2d5a3d] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#2d5a3d]">
                  <strong>Belangrijk:</strong> Droomvriendjes is geen therapie of behandeling. Het is een ondersteunend middel dat kan helpen bij het slaapproces. Raadpleeg altijd een professional bij zorgen.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Helps - Clear Structure */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2d5a3d] mb-12 text-center" style={{fontFamily: 'Quicksand, sans-serif'}}>
            Hoe Droomvriendjes helpt
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "Focuspunt voor het brein", desc: "White noise en zacht licht geven het actieve brein iets om op te focussen." },
              { icon: Eye, title: "Voorspelbaar ritueel", desc: "Elke avond hetzelfde: dezelfde geluiden, hetzelfde licht. Structuur biedt veiligheid." },
              { icon: Hand, title: "Tactiele troost", desc: "Het zachte materiaal biedt sensorische input die kalmerend kan werken." }
            ].map((item, idx) => (
              <Card key={idx} className="rounded-lg border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-[#2d5a3d] flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#2d5a3d] text-lg mb-2">{item.title}</h3>
                <p className="text-[#5a7a5a] text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews - Clean Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#2d5a3d] mb-2" style={{fontFamily: 'Quicksand, sans-serif'}}>
                Ervaringen van andere ouders
              </h2>
              <p className="text-[#5a7a5a]">Van ouders die dezelfde uitdagingen kennen</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-[#5a7a5a] text-sm">4.9 / 5</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="rounded-lg border border-gray-200 p-6 hover:border-[#2d5a3d] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#2d5a3d] flex items-center justify-center text-white font-medium">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[#2d5a3d]">{review.name}</p>
                    <p className="text-xs text-[#7a9a7a]">{review.context}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-[#4a6a4a] text-sm leading-relaxed">"{review.text}"</p>
                <p className="text-xs text-[#7a9a7a] mt-4">Product: {review.product}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="producten" className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
              Aanbevolen Droomvriendjes
            </h2>
            <p className="text-[#5a7a5a]">Speciaal geselecteerd voor kinderen die extra rust nodig hebben</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landingProducts.map((product) => (
              <Card key={product.id} className="rounded-lg border border-gray-200 overflow-hidden bg-white hover:shadow-lg hover:border-[#2d5a3d] transition-all">
                <Link to={`/product/${product.id}`}>
                  <div className="bg-[#f5f9f5] p-6 flex items-center justify-center aspect-square">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-contain max-h-[160px] hover:scale-105 transition-transform" />
                  </div>
                </Link>
                <CardContent className="p-6">
                  <span className="inline-block bg-[#e8f0e8] text-[#2d5a3d] text-xs font-medium px-2 py-1 rounded mb-3">{product.landingBadge}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#2d5a3d] text-lg mb-1 hover:underline">{product.shortName}</h3>
                  </Link>
                  <p className="text-sm text-[#7a9a7a] mb-4">{product.subtitle}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-[#2d5a3d]">€{product.price.toFixed(2).replace('.', ',')}</span>
                    <span className="text-xs text-[#7a9a7a]">incl. btw</span>
                  </div>
                  <Button onClick={() => handleAddToCart(product)} className="w-full bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-md py-4 transition-colors">
                    In winkelwagen
                  </Button>
                  <p className="text-center text-xs text-[#7a9a7a] mt-3">14 dagen retour · Gratis verzending</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Simple & Clear */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2d5a3d] mb-12" style={{fontFamily: 'Quicksand, sans-serif'}}>
            Veelgestelde vragen
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-[#fafafa] rounded-lg px-6 border border-gray-200">
                <AccordionTrigger className="text-left font-medium text-[#2d5a3d] hover:text-[#4a8a5a] py-5 text-sm">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#5a7a5a] pb-5 text-sm">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer - Clean */}
      <footer className="bg-[#2d5a3d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-xl font-bold mb-4 block" style={{fontFamily: 'Quicksand, sans-serif'}}>Droomvriendjes</span>
              <p className="text-[#a8d4a8] text-sm">Schaesbergerweg 103<br/>6415 AD Heerlen<br/>KVK: 9921083</p>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-sm">Navigatie</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/#producten" className="hover:text-white">Alle producten</Link></li>
                <li><Link to="/ouders-baby" className="hover:text-white">Ouders van baby's</Link></li>
                <li><Link to="/ouders-peuters" className="hover:text-white">Ouders van peuters</Link></li>
                <li><Link to="/ouders-extra-behoeften" className="hover:text-white">Extra behoeften</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-sm">Hulp</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/retourneren" className="hover:text-white">Retourneren</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-sm">Betalen</h3>
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

export default OudersExtraBehoeftenPage;
