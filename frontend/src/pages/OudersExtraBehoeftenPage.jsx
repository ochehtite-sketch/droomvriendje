import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';

const OudersExtraBehoeftenPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Select specific products - calming options
  const selectedProductIds = [11, 7, 2]; // Panda, Beer Projector, Schaap
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id))
    .map(p => ({
      ...p,
      subtitle: p.id === 11 ? "Zeer rustgevend" : p.id === 7 ? "Neutrale kleuren" : "Extra zacht",
      landingBadge: p.id === 11 ? "AANBEVOLEN BIJ ADHD" : p.id === 7 ? "AANBEVOLEN BIJ AUTISME" : "AANBEVOLEN BIJ HSP",
      landingDescription: p.id === 11 
        ? "De panda heeft rustgevende geluiden die helpen bij het tot rust komen. Ideaal voor kinderen die moeite hebben met het 'uitzetten' van hun hoofd."
        : p.id === 7 
        ? "Neutrale kleuren en voorspelbare lichtstanden. Geen verrassingen, alleen rust. Perfect voor kinderen die gevoelig zijn voor prikkels."
        : "Extra zacht materiaal voor kinderen die tactiele prikkels zoeken. De zachtheid biedt troost en veiligheid."
    }));

  const heroProduct = allProducts.find(p => p.id === 11) || allProducts[0];

  const reviews = [
    {
      name: "Marloes",
      context: "Moeder van Thijs (6 jaar, ADHD)",
      duration: "Gebruikt sinds 5 maanden",
      rating: 5,
      text: "Thijs kon nooit stoppen met bewegen, ook in bed niet. Het Droomvriendje helpt hem om te focussen op het licht en de geluiden in plaats van op alles om hem heen. Hij valt nu veel sneller in slaap en is overdag ook rustiger.",
      product: "Panda"
    },
    {
      name: "Johan",
      context: "Vader van Emma (5 jaar, autisme)",
      duration: "Gebruikt sinds 3 maanden",
      rating: 5,
      text: "Emma heeft veel structuur nodig. Het Droomvriendje is nu onderdeel van haar vaste routine. Ze weet precies wat ze kan verwachten: dezelfde geluiden, hetzelfde licht. Dat geeft haar rust.",
      product: "Beer Projector"
    },
    {
      name: "Annemiek",
      context: "Moeder van Lotte (4 jaar, HSP)",
      duration: "Gebruikt sinds 2 maanden",
      rating: 5,
      text: "Lotte voelt alles zo intens. Ze werd altijd overstuur van de dag. Nu knuffelt ze haar schaapje en het zachte materiaal kalmeert haar. Het is alsof het schaapje al haar zorgen absorbeert.",
      product: "Schaap"
    }
  ];

  const faqs = [
    {
      question: "Is dit geschikt voor kinderen met ADHD?",
      answer: "Veel ouders van kinderen met ADHD melden positieve ervaringen. De combinatie van white noise en zacht licht kan helpen om de overactieve geest tot rust te brengen. Het geeft het brein iets om op te focussen, wat kan helpen bij het inslapen. Elk kind is anders, maar de 14-dagen retourgarantie maakt het risico-vrij om te proberen."
    },
    {
      question: "Helpt dit bij kinderen met autisme?",
      answer: "Droomvriendjes kunnen helpen bij kinderen met autisme die baat hebben bij voorspelbaarheid en routine. Het vaste ritueel van het aanzetten, de bekende geluiden en het voorspelbare licht kunnen rust bieden. Kies bij voorkeur een model met neutrale kleuren en vermijd modellen met wisselende lichtpatronen als je kind daar gevoelig voor is."
    },
    {
      question: "Mijn kind is hoogsensitief (HSP). Is dit niet te veel prikkels?",
      answer: "Droomvriendjes zijn juist ontworpen om prikkels te verminderen, niet toe te voegen. De white noise maskeert onverwachte geluiden (die vaak overweldigend zijn voor HSP kinderen) en het zachte, constante licht is rustgevender dan wisselende lichtbronnen. Veel HSP kinderen vinden troost in het zachte materiaal van de knuffel."
    },
    {
      question: "Kan ik het geluid en licht aanpassen aan de behoeften van mijn kind?",
      answer: "Ja, alle Droomvriendjes hebben meerdere geluidsstanden en dimbare verlichting. Je kunt experimenteren met wat het beste werkt voor jouw kind. Sommige kinderen doen het beter met alleen licht, anderen met alleen geluid, en weer anderen met beide."
    },
    {
      question: "Vervangt dit therapie of behandeling?",
      answer: "Nee, Droomvriendjes is geen medisch hulpmiddel en vervangt geen professionele behandeling of therapie. Het is een ondersteunend middel dat kan helpen bij het slaapproces. Gebruik het altijd in overleg met behandelaars als je kind onder begeleiding is."
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f9f5]">
      <CartSidebar />

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_plush-revamp/artifacts/npuc23bl_lgoo%20ads%20%281%29.png" 
                alt="Droomvriendjes.nl" 
                className="h-16 w-auto"
              />
            </Link>
            <a href="#producten">
              <Button className="bg-white border-2 border-[#2d5a3d] text-[#2d5a3d] hover:bg-[#f5f9f5] rounded-full px-6">
                Bekijk knuffels <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white border border-[#c5d9c8] rounded-full px-4 py-2 text-sm text-[#2d5a3d] mb-6">
                Voor kinderen met ADHD, autisme of hoogsensitiviteit
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Rust vinden.<br />
                <span className="text-[#3d7a4d]">Ook voor jouw kind.</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Je kind ervaart de wereld anders. Intenser. Prikkels die anderen niet opmerken, kunnen voor jouw kind overweldigend zijn. Slapen wordt een uitdaging als het hoofd niet tot rust kan komen. Droomvriendjes biedt een zachte, voorspelbare manier om de dag af te sluiten.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">White noise die overprikkeling vermindert en externe geluiden maskeert</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Voorspelbaar, zacht licht dat rust geeft in plaats van stimuleert</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Zachte textuur voor kinderen die tactiele input zoeken</span>
                </li>
              </ul>
              
              <div className="flex items-center space-x-6">
                <a href="#producten">
                  <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-8 py-6 text-lg">
                    Ontdek Droomvriendjes
                  </Button>
                </a>
                <div className="text-sm text-[#5a7a5a]">
                  <p className="font-semibold">Vertrouwd door therapeuten</p>
                  <p>14 dagen om te proberen</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Card className="bg-white border-2 border-[#c5d9c8] rounded-3xl max-w-sm w-full overflow-hidden">
                <div className="bg-[#e8f0e8] p-8 flex items-center justify-center min-h-[300px]">
                  <img 
                    src={heroProduct.image}
                    alt="Droomvriendjes voor Extra Behoeften"
                    className="w-full h-auto object-contain max-h-[250px]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#2d5a3d] text-xl mb-1">Droomvriendjes Rust Editie</h3>
                  <p className="text-[#5a8a6a] text-sm mb-4">Speciaal geselecteerd voor extra rust</p>
                  
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-3xl font-bold text-[#2d5a3d]">€59,95</span>
                    <span className="text-sm text-[#5a8a6a]">incl. btw · 14 dagen retour</span>
                  </div>
                  
                  <a href="#producten">
                    <Button className="w-full bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full py-6 text-lg">
                      Bekijk alle opties
                    </Button>
                  </a>
                  
                  <div className="flex justify-between mt-4 text-sm text-[#5a8a6a]">
                    <span>Gratis verzending</span>
                    <span>Risico-vrij proberen</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            We begrijpen de uitdagingen.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Kinderen met ADHD, autisme of hoogsensitiviteit ervaren slaap vaak anders. Wat voor andere kinderen werkt, werkt niet altijd voor jouw kind.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-2xl mb-3">🧠</p>
              <p className="text-[#2d5a3d] font-bold text-lg mb-2">ADHD</p>
              <p className="text-sm text-[#5a7a5a] mb-3">Het brein blijft actief, ook als het lichaam moe is. Gedachten racen en stilliggen is bijna onmogelijk.</p>
              <p className="text-xs text-[#7a9a7a] italic">White noise kan helpen om het brein iets te geven om op te focussen.</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-2xl mb-3">🧩</p>
              <p className="text-[#2d5a3d] font-bold text-lg mb-2">Autisme</p>
              <p className="text-sm text-[#5a7a5a] mb-3">Veranderingen in routine en onverwachte prikkels kunnen het inslapen verstoren. Voorspelbaarheid is essentieel.</p>
              <p className="text-xs text-[#7a9a7a] italic">Een vast ritueel met bekend licht en geluid biedt structuur.</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-2xl mb-3">💫</p>
              <p className="text-[#2d5a3d] font-bold text-lg mb-2">Hoogsensitiviteit (HSP)</p>
              <p className="text-sm text-[#5a7a5a] mb-3">Elk geluid, elke verandering in licht, elke textuur wordt intens ervaren. De dag kan overweldigend zijn.</p>
              <p className="text-xs text-[#7a9a7a] italic">Zachte materialen en constante, zachte prikkels bieden rust.</p>
            </Card>
          </div>
          
          <Card className="bg-[#e8f0e8] border-2 border-[#c5d9c8] rounded-2xl p-6 mt-8">
            <p className="text-[#2d5a3d] font-semibold">
              ⚕️ Belangrijk: Droomvriendjes is geen therapie of behandeling. Het is een ondersteunend middel dat kan helpen bij het slaapproces. Raadpleeg altijd een professional bij zorgen over de ontwikkeling of het gedrag van je kind.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="py-16 border-t border-[#e0ebe0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Hoe Droomvriendjes kan helpen.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts.find(p => p.id === 11)?.image} 
                  alt="Focus"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Focuspunt voor het brein</h3>
                <p className="text-[#5a7a5a]">
                  White noise en zacht licht geven het actieve brein iets om op te focussen. Dit kan helpen om de eindeloze stroom gedachten te onderbreken.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts.find(p => p.id === 7)?.image} 
                  alt="Voorspelbaarheid"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Voorspelbaar ritueel</h3>
                <p className="text-[#5a7a5a]">
                  Elke avond hetzelfde: aanzetten, dezelfde geluiden, hetzelfde licht. Deze voorspelbaarheid biedt veiligheid en structuur.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts.find(p => p.id === 2)?.image} 
                  alt="Tactiele rust"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Tactiele troost</h3>
                <p className="text-[#5a7a5a]">
                  Het zachte materiaal biedt sensorische input die kalmerend kan werken. Iets om vast te houden, iets zachts om tegen te knuffelen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 border-t border-[#e0ebe0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-2">
                Ervaringen van andere ouders.
              </h2>
              <p className="text-[#5a7a5a]">
                Van ouders die dezelfde uitdagingen kennen.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-[#5a7a5a]">Gemiddelde beoordeling: <span className="font-bold text-[#2d5a3d] text-2xl">4.9 / 5</span></p>
              <p className="text-sm text-[#7a9a7a]">Gebaseerd op 150+ reviews</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-[#2d5a3d] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#2d5a3d]">{review.name}</p>
                    <p className="text-sm text-[#7a9a7a]">{review.context}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-[#4a6a4a] mb-4 text-sm leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                
                <p className="text-sm text-[#7a9a7a]">Besteld: {review.product}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="producten" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Aanbevolen Droomvriendjes.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Speciaal geselecteerd voor kinderen die extra rust nodig hebben. Kies het model dat het beste past bij de behoeften van jouw kind.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landingProducts.map((product) => (
              <Card key={product.id} className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <div className="bg-[#e8f0e8] p-8 flex items-center justify-center min-h-[200px] cursor-pointer hover:bg-[#dce8dc] transition-colors">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-auto object-contain max-h-[150px]"
                    />
                  </div>
                </Link>
                <CardContent className="p-6">
                  <p className="text-xs font-bold text-[#7a9a7a] mb-1">{product.landingBadge}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#2d5a3d] text-xl mb-1 hover:underline cursor-pointer">{product.shortName}</h3>
                  </Link>
                  <p className="text-sm text-[#7a9a7a] mb-3">{product.subtitle}</p>
                  <p className="text-[#5a7a5a] text-sm mb-4">{product.landingDescription}</p>
                  
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-2xl font-bold text-[#2d5a3d]">€{product.price.toFixed(2).replace('.', ',')}</span>
                    <span className="text-sm text-[#7a9a7a]">incl. btw</span>
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full py-4"
                  >
                    In winkelwagen
                  </Button>
                  
                  <p className="text-center text-xs text-[#7a9a7a] mt-3">
                    14 dagen retour · Gratis verzending
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-t border-[#e0ebe0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-12">
            Veelgestelde vragen.
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-white border-2 border-[#c5d9c8] rounded-2xl px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[#2d5a3d] hover:text-[#3d7a4d] py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#5a7a5a] pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Green Footer */}
      <footer className="bg-[#2d5a3d] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🧸</span>
                <span className="text-2xl font-bold">Droomvriendjes</span>
              </div>
              <div className="text-[#a8d4a8] text-sm space-y-1">
                <p className="font-semibold text-white mb-2">Bedrijfsgegevens</p>
                <p>Droomvriendjes</p>
                <p>Schaesbergerweg 103</p>
                <p>6415 AD Heerlen</p>
                <p className="mt-3">KVK: 9921083</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Navigatie</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/#producten" className="hover:text-white transition-colors">Alle producten</Link></li>
                <li><Link to="/ouders-slaaptips" className="hover:text-white transition-colors">Ouders slaaptips</Link></li>
                <li><Link to="/over-ons" className="hover:text-white transition-colors">Over Droomvriendjes</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/ouders-baby" className="hover:text-white transition-colors">Ouders van baby's</Link></li>
                <li><Link to="/ouders-peuters" className="hover:text-white transition-colors">Ouders van peuters</Link></li>
                <li><Link to="/ouders-extra-behoeften" className="hover:text-white transition-colors">Extra behoeften</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Hulp & Tips</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/tips-bedtijd" className="hover:text-white transition-colors">Tips voor bedtijd</Link></li>
                <li><Link to="/rustmoment-ouders" className="hover:text-white transition-colors">Rustmoment voor ouders</Link></li>
                <li><Link to="/stress" className="hover:text-white transition-colors">Stressvermindering</Link></li>
                <li><Link to="/slaapproblemen" className="hover:text-white transition-colors">Slaapproblemen</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Klantenservice</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/retourneren" className="hover:text-white transition-colors">Retourneren</Link></li>
                <li><Link to="/voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Beleid</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
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
