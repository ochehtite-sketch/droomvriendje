import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';

const VrouwenLandingPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Select specific products for this landing page (Beer, Panda, Schaap)
  const selectedProductIds = [7, 11, 2]; // Beer Projector, Panda, Schaap
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id))
    .map(p => ({
      ...p,
      subtitle: p.id === 7 ? "Neutrale bruine kleur" : p.id === 11 ? "Zacht wit/zwart, met sterrenprojectie" : "Extra zachte stof, extra gedimd licht",
      landingBadge: p.id === 7 ? "MEEST SUBTIEL" : p.id === 11 ? "VROUWEN 60+" : "MEEST ZACHT",
      landingDescription: p.id === 7 
        ? "Voor vrouwen die iets willen dat niet op een speelgoed lijkt, maar gewoon een zachte knuffel."
        : p.id === 11 
        ? "Voor vrouwen die een heel zacht lichtpatroon op het plafond waarderen tijdens het inslapen."
        : "Voor zeer gevoelige slapers die bijna volledige duisternis willen met alleen een heel zachte gloed."
    }));

  // Get the first product for the hero card
  const heroProduct = allProducts.find(p => p.id === 7) || allProducts[0];

  // Reviews from women 60+
  const reviews = [
    {
      name: "Marga",
      age: 67,
      duration: "Gebruikt sinds 3 maanden",
      rating: 5,
      text: "De opvliegers houden me vaak wakker. Nu zet ik mijn Droomvriendje aan als ik wakker word. Het zachte licht en het rustige geluid helpen me om niet direct weer te gaan piekeren. Ik val vaak binnen een half uur weer in slaap. Dat is een enorme verbetering.",
      product: "Star Panda"
    },
    {
      name: "Jannie",
      age: 71,
      duration: "Gebruikt sinds 6 weken",
      rating: 5,
      text: "Ik was sceptisch, maar mijn dochter had het voor me gekocht. De eerste week deed het niet veel, maar nu is het echt een fijn ritueel geworden. Ik houd de knuffel vast en het helpt me om mijn gedachten te stoppen met racen. Niet perfect, maar wel veel beter.",
      product: "Calm Bear"
    },
    {
      name: "Helena",
      age: 64,
      duration: "Gebruikt sinds 2 maanden",
      rating: 4,
      text: "Na mijn scheiding sliep ik heel slecht. De nachten voelden zo lang. Deze knuffel met licht geeft me een veilig gevoel. Ik gebruik het elke avond. Soms slaap ik nog steeds niet direct, maar de nachten voelen minder eenzaam.",
      product: "Cloud Friend"
    }
  ];

  // FAQ items
  const faqs = [
    {
      question: "Is dit niet alleen voor kinderen?",
      answer: "Nee, absoluut niet. Droomvriendjes is ontworpen voor iedereen die behoefte heeft aan een rustiger slaapmoment. Veel van onze klanten zijn volwassen vrouwen die baat hebben bij het zachte licht en de kalmerende geluiden tijdens het inslapen."
    },
    {
      question: "Kan ik dit gebruiken met mijn slaapmedicatie?",
      answer: "Ja, Droomvriendjes is geen medicijn en heeft geen interactie met medicatie. Het is simpelweg een zachte ondersteuning die u naast uw huidige behandeling kunt gebruiken. Raadpleeg bij twijfel altijd uw arts."
    },
    {
      question: "Is het moeilijk in te stellen?",
      answer: "Helemaal niet. Er zijn slechts 3 knoppen: aan/uit, licht dimmen, en geluid selecteren. De meeste vrouwen hebben het binnen 2 minuten onder de knie."
    },
    {
      question: "Wat als het niet werkt voor mij?",
      answer: "U heeft 30 dagen om het uit te proberen. Werkt het niet voor u? Dan krijgt u uw geld volledig terug, zonder vragen. We willen dat u zeker bent van uw keuze."
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f9f5]">
      {/* Cart Sidebar */}
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
                Kies je rustmaatje <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block bg-white border border-[#c5d9c8] rounded-full px-4 py-2 text-sm text-[#2d5a3d] mb-6">
                Speciaal voor vrouwen van 60+ met slaapproblemen
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Geen wonder, geen druk.<br />
                <span className="text-[#3d7a4d]">Gewoon een moment van rust om bij te komen.</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Als nachten langer voelen dan dagen — door opvliegers, piekeren, of gewoon omdat uw lichaam anders reageert dan vroeger. U bent niet kapot. U heeft alleen een zacht, veilig ritueel nodig dat zegt: &ldquo;voor nu, we rusten.&rdquo;
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Voor vrouwen die om 3:00 uur wakker liggen van opvliegers of zorgen over familie.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Werkt samen met uw behandeling of medicatie — geen vervanging, maar een zachte ondersteuning.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#2d5a3d] mt-1">•</span>
                  <span className="text-[#4a6a4a]">Geen ingewikkelde technologie. Alleen zacht licht, rustig geluid en iets warms om vast te houden.</span>
                </li>
              </ul>
              
              <div className="flex items-center space-x-6">
                <a href="#producten">
                  <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-8 py-6 text-lg">
                    Kies uw Droomvriendje
                  </Button>
                </a>
                <div className="text-sm text-[#5a7a5a]">
                  <p className="font-semibold">100.000+ klanten slapen beter. 86%</p>
                  <p>rapporteert rustigere nachten.*</p>
                </div>
              </div>
              
              <p className="text-xs text-[#7a9a7a] mt-6 italic">
                *Zelfgerapporteerde ervaring, geen medische claim. Bij aanhoudende klachten: raadpleeg uw arts.
              </p>
            </div>
            
            {/* Right - Product Card */}
            <div className="flex justify-center">
              <Card className="bg-white border-2 border-[#c5d9c8] rounded-3xl max-w-sm w-full overflow-hidden">
                <div className="bg-[#e8f0e8] p-8 flex items-center justify-center min-h-[300px]">
                  <img 
                    src={heroProduct.image}
                    alt="Droomvriendjes Rustige Nachten Editie"
                    className="w-full h-auto object-contain max-h-[250px]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#2d5a3d] text-xl mb-1">Droomvriendjes Rustige Nachten Editie</h3>
                  <p className="text-[#5a8a6a] text-sm mb-4">Speciaal voor volwassen vrouwen</p>
                  
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-3xl font-bold text-[#2d5a3d]">€59,95</span>
                    <span className="text-sm text-[#5a8a6a]">incl. btw · 30 dagen proberen</span>
                  </div>
                  
                  <a href="#producten">
                    <Button className="w-full bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full py-6 text-lg">
                      Ik wil rustigere nachten
                    </Button>
                  </a>
                  
                  <div className="flex justify-between mt-4 text-sm text-[#5a8a6a]">
                    <span>Discrete verzending</span>
                    <span>Werkt met uw slaapplan</span>
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
            &ldquo;Het ligt niet aan u. Het is heel normaal.&rdquo;
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Bijna de helft van alle vrouwen van 65+ heeft slaapproblemen. Door hormonale veranderingen, opvliegers, of gewoon omdat uw lichaam anders reageert. U bent absoluut niet de enige die &apos;s nachts wakker ligt.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-4xl font-bold text-[#2d5a3d] mb-2">50%</p>
              <p className="text-[#4a6a4a] font-medium">van vrouwen 65+ heeft slaapproblemen</p>
              <p className="text-sm text-[#7a9a7a] mt-2">Bron: CBS, Gezondheidsenquête 2022</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-4xl font-bold text-[#2d5a3d] mb-2">80%</p>
              <p className="text-[#4a6a4a] font-medium">van vrouwen in de overgang heeft opvliegers</p>
              <p className="text-sm text-[#7a9a7a] mt-2">Bron: Hersenstichting</p>
            </Card>
            
            <Card className="bg-[#f5f9f5] border-0 p-6">
              <p className="text-4xl font-bold text-[#2d5a3d] mb-2">17,5%</p>
              <p className="text-[#4a6a4a] font-medium">van vrouwen 65+ gebruikt slaapmedicatie</p>
              <p className="text-sm text-[#7a9a7a] mt-2">Bron: Thuisarts.nl</p>
            </Card>
          </div>
          
          <p className="text-[#5a7a5a] text-center max-w-3xl mx-auto">
            Droomvriendjes is geen medicijn en vervangt geen medisch advies. Het is een zachte, fysieke ondersteuning die helpt bij het creëren van een rustige slaapomgeving.
          </p>
        </div>
      </section>

      {/* Features Section with Real Images */}
      <section className="py-16 border-t border-[#e0ebe0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Een zacht ritueel, geen ingewikkeld apparaat.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            U heeft geen nieuwe technologie nodig die u moet leren kennen. U heeft een simpel, betrouwbaar ritueel nodig dat uw lichaam herkent als &ldquo;tijd om te rusten&rdquo;.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts.find(p => p.id === 7)?.image} 
                  alt="Warm licht"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Warm licht</h3>
                <p className="text-[#5a7a5a]">
                  Een zacht, gedimd schijnsel dat u uit de volledige duisternis houdt (als dat onrust geeft) zonder u wakker te maken zoals een telefoonscherm.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts.find(p => p.id === 12)?.image} 
                  alt="Rustige geluiden"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Rustige geluiden</h3>
                <p className="text-[#5a7a5a]">
                  Witte ruis en kalmerende geluiden maskeren plotselinge geluiden en geven uw hersenen iets voorspelbaars om op te focussen.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
              <div className="bg-[#e8f0e8] p-6 flex items-center justify-center min-h-[200px]">
                <img 
                  src={allProducts.find(p => p.id === 11)?.image} 
                  alt="Iets om vast te houden"
                  className="w-full h-auto object-contain max-h-[150px]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Iets om vast te houden</h3>
                <p className="text-[#5a7a5a]">
                  De knuffel zelf geeft uw handen een contactpunt — veel vrouwen voelen zich rustiger met iets zachts vast te houden.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-[#e8f0e8] border-2 border-[#c5d9c8] rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-xl font-bold text-[#2d5a3d] mb-2">
                  &ldquo;Geen wonder, geen druk. Gewoon een zachte ondersteuning.&rdquo;
                </p>
                <p className="text-[#5a7a5a]">
                  We beloven geen &ldquo;perfecte slaap in 3 dagen&rdquo;. We beloven wel een zachtere manier om de dag af te sluiten — een die veel vrouwen blijven gebruiken, ook na de eerste nacht.
                </p>
              </div>
              <a href="#producten" className="mt-6 md:mt-0 md:ml-8 flex-shrink-0">
                <Button className="bg-white border-2 border-[#2d5a3d] text-[#2d5a3d] hover:bg-[#f5f9f5] rounded-full px-8 py-4">
                  Start uw rust-ritueel
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* 10-Minute Routine Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Uw 10-minuten &ldquo;tijd-voor-rust&rdquo; routine.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Eenvoudig genoeg voor de moeilijkste dagen. Zacht genoeg dat u zich niet &ldquo;fout&rdquo; voelt als het even niet lukt.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-6">
              <p className="text-sm font-bold text-[#7a9a7a] mb-2">STAP 1</p>
              <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Zet de druk uit</h3>
              <p className="text-[#5a7a5a]">
                Leg uw telefoon aan de kant. Zeg tegen uzelf: &ldquo;Voor de komende 20 minuten is niets dringend.&rdquo; Dit is uw moment.
              </p>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-6">
              <p className="text-sm font-bold text-[#7a9a7a] mb-2">STAP 2</p>
              <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Licht en geluid aan</h3>
              <p className="text-[#5a7a5a]">
                Kies een zachte kleur en rustig geluid, zet de timer. Laat uw ogen het licht volgen of uw oren het ritme.
              </p>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-6">
              <p className="text-sm font-bold text-[#7a9a7a] mb-2">STAP 3</p>
              <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Adem mee</h3>
              <p className="text-[#5a7a5a]">
                Houd uw Droomvriendje vast, adem 4 tellen in, 6 tellen uit, 10 keer. Gedachten komen en gaan — uw enige taak is rusten.
              </p>
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
                Wat vrouwen van uw leeftijd zeggen.
              </h2>
              <p className="text-[#5a7a5a]">
                Eerlijke ervaringen van vrouwen van 60+ die Droomvriendjes gebruiken voor rustigere nachten.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-[#5a7a5a]">Gemiddelde beoordeling: <span className="font-bold text-[#2d5a3d] text-2xl">4.8 / 5</span></p>
              <p className="text-sm text-[#7a9a7a]">Gebaseerd op 200+ reviews van vrouwen 60+</p>
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
                    <p className="font-bold text-[#2d5a3d]">{review.name}, {review.age} jaar</p>
                    <p className="text-sm text-[#7a9a7a]">{review.duration}</p>
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
                
                <p className="text-sm text-[#7a9a7a]">— Besteld: {review.product}</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/reviews" className="text-[#2d5a3d] font-medium hover:underline">
              Bekijk alle 200+ reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="producten" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Kies uw rustmaatje.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Alle Droomvriendjes hebben zacht licht, rustige geluiden en een comfortabele knuffel — alleen het uiterlijk verschilt.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landingProducts.map((product) => (
              <Card key={product.id} className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <div className="bg-[#e8f0e8] p-8 flex items-center justify-center min-h-[280px] cursor-pointer hover:bg-[#dce8dc] transition-colors">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-auto object-contain max-h-[220px] max-w-[220px]"
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
                    Voeg toe aan winkelwagen
                  </Button>
                  
                  <p className="text-center text-xs text-[#7a9a7a] mt-3">
                    30 dagen proberen · Gratis verzending
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-8">
            <h3 className="font-bold text-[#2d5a3d] text-xl mb-4">Veilig & Vertrouwd</h3>
            <div className="space-y-3">
              <p className="flex items-center text-[#4a6a4a]">
                <span className="text-[#2d5a3d] mr-3">✓</span>
                Geen ingewikkelde technologie - simpel 3 knoppen
              </p>
              <p className="flex items-center text-[#4a6a4a]">
                <span className="text-[#2d5a3d] mr-3">✓</span>
                30 dagen uitproberen, niet tevreden? Geld terug
              </p>
              <p className="flex items-center text-[#4a6a4a]">
                <span className="text-[#2d5a3d] mr-3">✓</span>
                Discrete verzending in neutrale doos
              </p>
              <p className="flex items-center text-[#4a6a4a]">
                <span className="text-[#2d5a3d] mr-3">✓</span>
                Werkt met uw huidige slaapmedicatie of behandeling
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-t border-[#e0ebe0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-12">
            Veelgestelde vragen van vrouwen van uw leeftijd.
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

      {/* Disclaimer */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#7a9a7a]">
            Droomvriendjes is geen medisch hulpmiddel en vervangt geen medisch advies of behandeling. Bij aanhoudende ernstige slaapproblemen: raadpleeg altijd uw huisarts of slaapspecialist.
          </p>
        </div>
      </section>

      {/* Full Footer - Green theme for Vrouwen 60+ page */}
      <footer className="bg-[#2d5a3d] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Bedrijfsgegevens */}
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
                <p className="text-xs italic">(Dit is geen bezoekadres)</p>
                <p className="mt-3">KVK: 9921083</p>
                
                <div className="mt-4 pt-4 border-t border-[#3d7a4d]">
                  <p className="font-semibold text-white mb-1">Retouradres:</p>
                  <p>Centerpoort-Nieuwgraaf</p>
                  <p>Geograaf 16</p>
                  <p>6921 EW Duiven</p>
                </div>
              </div>
            </div>

            {/* Navigatie */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Navigatie</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/#producten" className="hover:text-white transition-colors">Onze Kalmerende Knuffels</Link></li>
                <li><Link to="/#producten" className="hover:text-white transition-colors">Alle producten</Link></li>
                <li><Link to="/#producten" className="hover:text-white transition-colors">Voordeelbundels</Link></li>
                <li><Link to="/over-ons" className="hover:text-white transition-colors">Over Droomvriendjes</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
                <li><Link to="/cadeaubon" className="hover:text-white transition-colors">Cadeaubon</Link></li>
                <li><Link to="/uitproberen" className="hover:text-white transition-colors">14 dagen gratis uitproberen</Link></li>
                <li><Link to="/reviews" className="hover:text-white transition-colors">Beoordelingen</Link></li>
                <li><Link to="/naam-bedenker" className="hover:text-white transition-colors">Droomvriendjes naam bedenker</Link></li>
                <li><Link to="/vrouwen-60" className="hover:text-white transition-colors">Vrouwen 60+</Link></li>
              </ul>
            </div>

            {/* Droomvriendjes helpt bij */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Droomvriendjes helpt bij</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/stress" className="hover:text-white transition-colors">Stressvermindering</Link></li>
                <li><Link to="/overprikkeling" className="hover:text-white transition-colors">Prikkelverwerking</Link></li>
                <li><Link to="/angst" className="hover:text-white transition-colors">Angstvermindering</Link></li>
                <li><Link to="/slaapproblemen" className="hover:text-white transition-colors">Beter slapen</Link></li>
                <li><Link to="/troost" className="hover:text-white transition-colors">Troost vinden</Link></li>
                <li><Link to="/hsp" className="hover:text-white transition-colors">Hoogsensitiviteit</Link></li>
                <li><Link to="/dementie" className="hover:text-white transition-colors">Dementie</Link></li>
              </ul>
            </div>

            {/* Klantenservice */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Klantenservice</h3>
              <ul className="space-y-2 text-[#a8d4a8] text-sm">
                <li><Link to="/#producten" className="hover:text-white transition-colors">Zoeken</Link></li>
                <li><Link to="/retourneren" className="hover:text-white transition-colors">Retourneren</Link></li>
                <li><Link to="/voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Beleid</Link></li>
                <li><Link to="/#faq" className="hover:text-white transition-colors">Veelgestelde Vragen</Link></li>
                <li><Link to="/#producten" className="hover:text-white transition-colors">Verzending</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
              <div className="mt-6">
                <p className="font-semibold text-white mb-2 text-sm">Betaalmethoden</p>
                <div className="text-[#a8d4a8] text-sm">
                  <p>iDEAL • Klarna</p>
                  <p>PayPal • Creditcard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-[#3d7a4d] pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-[#a8d4a8] text-sm">© 2025 Droomvriendjes. Alle rechten voorbehouden.</p>
              <div className="flex items-center space-x-4 text-[#a8d4a8] text-sm">
                <Link to="/voorwaarden" className="hover:text-white transition-colors">Voorwaarden</Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <span>•</span>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VrouwenLandingPage;
