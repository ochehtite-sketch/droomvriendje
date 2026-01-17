import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';

const OudersPeutersPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Select specific products for toddlers
  const selectedProductIds = [5, 9, 4]; // Dinosaurus, Eenhoorn, Pinguïn
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id))
    .map(p => ({
      ...p,
      subtitle: p.id === 5 ? "Stoer voor jongens" : p.id === 9 ? "Magisch voor meisjes" : "Schattig en neutraal",
      landingBadge: p.id === 5 ? "FAVORIET JONGENS" : p.id === 9 ? "FAVORIET MEISJES" : "UNISEX KEUZE",
      landingDescription: p.id === 5 
        ? "Stoere dino voor kleine avonturiers die bang zijn in het donker. De sterrenprojectie maakt het spannend én rustgevend."
        : p.id === 9 
        ? "Magische eenhoorn voor kleine droomsters. Het zachte roze licht creëert een sprookjesachtige slaapkamer."
        : "Vrolijke pinguïn die zowel jongens als meisjes aanspreken. Perfect voor kinderen die van dieren houden."
    }));

  const heroProduct = allProducts.find(p => p.id === 5) || allProducts[0];

  const reviews = [
    {
      name: "Sanne",
      context: "Moeder van Daan (3 jaar)",
      duration: "Gebruikt sinds 4 maanden",
      rating: 5,
      text: "Daan had elke nacht nachtmerries en wilde niet alleen slapen. Zijn dinosaurus is nu zijn 'beschermer'. Hij vertelt de dino over zijn dag en valt veel rustiger in slaap. De nachtmerries zijn bijna helemaal weg!",
      product: "Dinosaurus"
    },
    {
      name: "Peter",
      context: "Vader van Sophie (2,5 jaar)",
      duration: "Gebruikt sinds 2 maanden",
      rating: 5,
      text: "Het bedtijdritueel was altijd een strijd. Nu vraagt Sophie zelf om haar eenhoorn en het 'sterrenfeestje'. Ze kijkt naar de projectie en is binnen 20 minuten in slaap. Een wereld van verschil!",
      product: "Eenhoorn"
    },
    {
      name: "Linda",
      context: "Moeder van Lucas (4 jaar)",
      duration: "Gebruikt sinds 3 maanden",
      rating: 5,
      text: "Lucas werd altijd wakker als wij naar bed gingen. Nu blijft hij liggen met zijn pinguïn en de white noise. Hij zegt dat de pinguïn op hem past. Wij hebben eindelijk weer een avond samen!",
      product: "Pinguïn"
    }
  ];

  const faqs = [
    {
      question: "Mijn peuter wil niet alleen slapen. Helpt dit?",
      answer: "Veel ouders melden dat hun peuter zich veiliger voelt met een Droomvriendje. De combinatie van een knuffelmaatje, zacht licht en rustgevend geluid geeft kinderen het gevoel dat ze niet alleen zijn. Het vervangt niet de nabijheid van ouders, maar kan helpen bij de overgang naar zelfstandig slapen."
    },
    {
      question: "Mijn kind heeft nachtmerries. Kan dit helpen?",
      answer: "Het zachte licht van een Droomvriendje kan kinderen helpen om zich veiliger te voelen in het donker. Veel kinderen met nachtmerries vinden troost in de aanwezigheid van hun knuffel en het licht. Het is geen wondermiddel, maar veel ouders melden een vermindering van nachtmerries."
    },
    {
      question: "Is dit geschikt voor een kind van 2-4 jaar?",
      answer: "Ja, Droomvriendjes zijn perfect voor peuters. In deze leeftijd ontwikkelen kinderen vaak angst voor het donker of hebben ze moeite met alleen slapen. De knuffels zijn stevig genoeg om mee te spelen en zacht genoeg om mee te knuffelen."
    },
    {
      question: "Hoe voorkom ik dat mijn kind de hele nacht het licht aan laat?",
      answer: "Alle Droomvriendjes hebben een timer functie. Je kunt kiezen voor 30 of 60 minuten, waarna het licht en geluid automatisch uitgaan. Zo leert je kind om in te slapen met het licht, maar slaapt het de rest van de nacht in het donker."
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
                Speciaal voor ouders van peuters (1-4 jaar)
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Bedtijd zonder strijd.<br />
                <span className="text-[#3d7a4d]">Een ritueel dat werkt.</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                &ldquo;Ik wil niet slapen!&rdquo; &ldquo;Nog één verhaaltje!&rdquo; &ldquo;Ik ben bang!&rdquo; Herkenbaar? Peuters testen grenzen, ook rond bedtijd. Een vast slaapritueel met een speciaal vriendje kan het verschil maken tussen een uur strijd en een rustige avond.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Sterrenprojectie die angst voor het donker vermindert</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Een &ldquo;vriendje&rdquo; dat meegaat naar bed en beschermt</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Timer functie zodat het licht vanzelf uitgaat</span>
                </li>
              </ul>
              
              <div className="flex items-center space-x-6">
                <a href="#producten">
                  <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-8 py-6 text-lg">
                    Ontdek Droomvriendjes
                  </Button>
                </a>
                <div className="text-sm text-[#5a7a5a]">
                  <p className="font-semibold">Favoriet bij 50.000+ peuters</p>
                  <p>Bedtijd wordt een feestje</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Card className="bg-white border-2 border-[#c5d9c8] rounded-3xl max-w-sm w-full overflow-hidden">
                <div className="bg-[#e8f0e8] p-8 flex items-center justify-center min-h-[300px]">
                  <img 
                    src={heroProduct.image}
                    alt="Droomvriendjes voor Peuters"
                    className="w-full h-auto object-contain max-h-[250px]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#2d5a3d] text-xl mb-1">Droomvriendjes Peuter Editie</h3>
                  <p className="text-[#5a8a6a] text-sm mb-4">Perfect voor kleine avonturiers</p>
                  
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
                    <span>Met sterrenprojectie</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Common Challenges Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Herken je dit?
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Peuters en slaap: het is een combinatie die veel ouders grijze haren bezorgt. Je bent niet alleen.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-2xl mb-3">😰</p>
              <p className="text-[#2d5a3d] font-bold mb-2">Angst voor het donker</p>
              <p className="text-sm text-[#5a7a5a]">Rond 2-3 jaar ontwikkelen veel kinderen plotseling angst voor het donker.</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-2xl mb-3">🛏️</p>
              <p className="text-[#2d5a3d] font-bold mb-2">Niet alleen willen slapen</p>
              <p className="text-sm text-[#5a7a5a]">Peuters willen bij papa of mama zijn. Alleen in bed voelt onveilig.</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-2xl mb-3">⏰</p>
              <p className="text-[#2d5a3d] font-bold mb-2">Eindeloze bedtijd</p>
              <p className="text-sm text-[#5a7a5a]">&ldquo;Nog één verhaaltje&rdquo;, &ldquo;nog wat water&rdquo;, &ldquo;nog een knuffel&rdquo;...</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-2xl mb-3">😱</p>
              <p className="text-[#2d5a3d] font-bold mb-2">Nachtmerries</p>
              <p className="text-sm text-[#5a7a5a]">De fantasie van peuters is groot, en dat kan leiden tot enge dromen.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="py-16 border-t border-[#e0ebe0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Zo helpt een Droomvriendje je peuter.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts[4]?.image} 
                  alt="Sterrenprojectie"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Magische Sterrenhemel</h3>
                <p className="text-[#5a7a5a]">
                  De sterrenprojectie transformeert de kamer in een magische ruimte. Angst voor het donker wordt verwondering voor de sterren.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts[3]?.image} 
                  alt="Slaapvriendje"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Een Vriendje Dat Beschermt</h3>
                <p className="text-[#5a7a5a]">
                  Je peuter is niet alleen. Het Droomvriendje &ldquo;past op&rdquo; terwijl papa en mama even weg zijn. Een geruststellend idee voor kleine kinderen.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts[8]?.image} 
                  alt="Slaapritueel"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Een Vast Ritueel</h3>
                <p className="text-[#5a7a5a]">
                  Peuters houden van voorspelbaarheid. Het Droomvriendje aanzetten wordt onderdeel van het bedtijdritueel dat rust en structuur geeft.
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
                Wat andere ouders van peuters zeggen.
              </h2>
              <p className="text-[#5a7a5a]">
                Eerlijke ervaringen van ouders met kinderen van 1-4 jaar.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-[#5a7a5a]">Gemiddelde beoordeling: <span className="font-bold text-[#2d5a3d] text-2xl">4.8 / 5</span></p>
              <p className="text-sm text-[#7a9a7a]">Gebaseerd op 300+ reviews</p>
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
            Kies het perfecte Droomvriendje voor je peuter.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Welk karakter spreekt je kind aan? Stoere dino, magische eenhoorn of vrolijke pinguïn?
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
            Veelgestelde vragen van ouders met peuters.
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

export default OudersPeutersPage;
