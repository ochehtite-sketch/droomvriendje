import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';

const OudersBabyPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Select specific products for this landing page
  const selectedProductIds = [2, 1, 8]; // Schaap, Leeuw, Schaap Liggend
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id))
    .map(p => ({
      ...p,
      subtitle: p.id === 2 ? "Zacht en knuffelbaar" : p.id === 1 ? "Met sterrenprojectie" : "Extra zacht materiaal",
      landingBadge: p.id === 2 ? "POPULAIR BIJ OUDERS" : p.id === 1 ? "BESTE KEUZE" : "EXTRA ZACHT",
      landingDescription: p.id === 2 
        ? "Perfect voor baby's die moeite hebben met inslapen. De zachte white noise helpt bij het creëren van een rustgevende omgeving."
        : p.id === 1 
        ? "De sterrenprojectie geeft een magisch gevoel en helpt baby's om rustig te worden voor het slapengaan."
        : "Extra zacht materiaal, ideaal voor de gevoelige babyhuid. Met gedimd licht voor 's nachts."
    }));

  const heroProduct = allProducts.find(p => p.id === 2) || allProducts[0];

  const reviews = [
    {
      name: "Lisa",
      context: "Moeder van Sem (8 maanden)",
      duration: "Gebruikt sinds 2 maanden",
      rating: 5,
      text: "Sem sliep nooit langer dan 2 uur achter elkaar. Sinds we het Droomvriendje gebruiken, slaapt hij regelmatig 5-6 uur door. Het zachte licht en geluid helpen hem om weer in slaap te vallen als hij even wakker wordt.",
      product: "Schaap"
    },
    {
      name: "Mark",
      context: "Vader van tweeling (6 maanden)",
      duration: "Gebruikt sinds 6 weken",
      rating: 5,
      text: "Met een tweeling is slapen een uitdaging. De Droomvriendjes helpen enorm bij het creëren van een vast slaapritueel. Beide baby's worden rustig van het geluid en het licht.",
      product: "Leeuw (2x)"
    },
    {
      name: "Emma",
      context: "Moeder van Olivia (4 maanden)",
      duration: "Gebruikt sinds 3 weken",
      rating: 5,
      text: "Als eerste-keer-moeder was ik wanhopig door slaapgebrek. Het Droomvriendje heeft onze nachten veranderd. Olivia valt nu binnen 15 minuten in slaap met het zachte geluid.",
      product: "Schaap Liggend"
    }
  ];

  const faqs = [
    {
      question: "Is dit veilig voor mijn baby?",
      answer: "Ja, alle Droomvriendjes zijn CE-gecertificeerd en voldoen aan de strengste Europese veiligheidsnormen voor babyspeelgoed. De materialen zijn hypoallergeen en vrij van schadelijke stoffen. Het wordt aanbevolen om de knuffel buiten het bereik van de baby te plaatsen tijdens het slapen."
    },
    {
      question: "Vanaf welke leeftijd kan ik dit gebruiken?",
      answer: "Droomvriendjes zijn geschikt vanaf 0 maanden. Voor baby's onder de 6 maanden adviseren we de knuffel naast het bedje te plaatsen (niet erin) zodat de baby kan genieten van het licht en geluid zonder direct contact."
    },
    {
      question: "Helpt dit echt bij doorslapen?",
      answer: "Veel ouders melden dat hun baby beter doorslaapt met een Droomvriendje. De combinatie van white noise en zacht licht helpt bij het creëren van een consistente slaapomgeving. Echter, elk kind is anders en resultaten kunnen variëren."
    },
    {
      question: "Hoe lang gaat de batterij mee?",
      answer: "De batterijen gaan gemiddeld 4-6 weken mee bij dagelijks gebruik. De knuffel schakelt automatisch uit na 30 of 60 minuten (instelbaar) om batterijen te sparen."
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
                Speciaal voor ouders van baby's (0-12 maanden)
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Eindelijk weer slapen.<br />
                <span className="text-[#3d7a4d]">Voor jou én je baby.</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Je bent moe. Uitgeput zelfs. De nachten zijn lang en de dagen nog langer. Je baby slaapt niet door en jij ook niet. We snappen het. Droomvriendjes helpt bij het creëren van een rustgevend slaapritueel dat werkt.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Rustgevende white noise die externe geluiden maskeert</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Zacht nachtlampje voor voedingen en verschoningen</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">CE-gecertificeerd en veilig vanaf 0 maanden</span>
                </li>
              </ul>
              
              <div className="flex items-center space-x-6">
                <a href="#producten">
                  <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-8 py-6 text-lg">
                    Ontdek Droomvriendjes
                  </Button>
                </a>
                <div className="text-sm text-[#5a7a5a]">
                  <p className="font-semibold">100.000+ tevreden ouders</p>
                  <p>86% meldt betere nachten</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Card className="bg-white border-2 border-[#c5d9c8] rounded-3xl max-w-sm w-full overflow-hidden">
                <div className="bg-[#e8f0e8] p-8 flex items-center justify-center min-h-[300px]">
                  <img 
                    src={heroProduct.image}
                    alt="Droomvriendjes voor Baby's"
                    className="w-full h-auto object-contain max-h-[250px]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#2d5a3d] text-xl mb-1">Droomvriendjes Baby Editie</h3>
                  <p className="text-[#5a8a6a] text-sm mb-4">Veilig en zacht vanaf 0 maanden</p>
                  
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
                    <span>CE-gecertificeerd</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Je bent niet de enige met slaapgebrek.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Bijna alle ouders van baby's ervaren slaapproblemen. Het is normaal, maar dat maakt het niet minder uitputtend. Een vast slaapritueel kan het verschil maken.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-4xl font-bold text-[#2d5a3d] mb-2">76%</p>
              <p className="text-[#4a6a4a] font-medium">van baby's slaapt niet door voor 12 maanden</p>
              <p className="text-sm text-[#7a9a7a] mt-2">Bron: Slaaponderzoek 2023</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-4xl font-bold text-[#2d5a3d] mb-2">4-6 uur</p>
              <p className="text-[#4a6a4a] font-medium">gemiddelde slaap voor nieuwe ouders</p>
              <p className="text-sm text-[#7a9a7a] mt-2">Bron: Ouderschap Studies</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-4xl font-bold text-[#2d5a3d] mb-2">86%</p>
              <p className="text-[#4a6a4a] font-medium">van ouders meldt verbetering met slaapritueel</p>
              <p className="text-sm text-[#7a9a7a] mt-2">Bron: Droomvriendjes Klantonderzoek</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-t border-[#e0ebe0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Waarom Droomvriendjes werkt voor baby's.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            De combinatie van white noise, zacht licht en een knuffelbare vorm creëert de perfecte slaapomgeving voor je baby.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts[0]?.image} 
                  alt="White Noise"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">White Noise</h3>
                <p className="text-[#5a7a5a]">
                  Maskeert plotselinge geluiden en creëert een constante, rustgevende achtergrond die baby's helpt om dieper te slapen.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts[1]?.image} 
                  alt="Zacht Licht"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Zacht Nachtlicht</h3>
                <p className="text-[#5a7a5a]">
                  Perfect voor nachtelijke voedingen en verschoningen. Warm licht dat je baby niet wakker maakt maar jou wel laat zien.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts[2]?.image} 
                  alt="Veilig Design"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">100% Veilig</h3>
                <p className="text-[#5a7a5a]">
                  CE-gecertificeerd, hypoallergeen materiaal en geen kleine onderdelen. Speciaal ontworpen voor de veiligheid van je baby.
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
                Wat andere ouders zeggen.
              </h2>
              <p className="text-[#5a7a5a]">
                Eerlijke ervaringen van ouders met baby's die Droomvriendjes gebruiken.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-[#5a7a5a]">Gemiddelde beoordeling: <span className="font-bold text-[#2d5a3d] text-2xl">4.7 / 5</span></p>
              <p className="text-sm text-[#7a9a7a]">Gebaseerd op 500+ reviews</p>
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
            Kies het perfecte Droomvriendje voor je baby.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Alle knuffels hebben white noise, zacht licht en zijn veilig voor baby's. Kies degene die het beste bij jullie past.
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
            Veelgestelde vragen van ouders.
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

export default OudersBabyPage;
