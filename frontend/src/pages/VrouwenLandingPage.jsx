import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight, Phone, Mail, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartSidebar from '../components/CartSidebar';

const VrouwenLandingPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Products specifically for this landing page - using real product images
  const products = [
    {
      id: 8,
      name: "Slaapknuffel Beer",
      shortName: "Beer",
      subtitle: "Neutrale bruine kleur",
      badge: "MEEST SUBTIEL",
      description: "Voor vrouwen die iets willen dat niet op een speelgoed lijkt, maar gewoon een zachte knuffel.",
      price: 59.95,
      image: "https://customer-assets.emergentagent.com/job_kidssleepaid/artifacts/a5v4z3yd_Baby%20Nachtlamp%20Beer%20%E2%80%93%20Sterrenprojector%20met%20Muziek.png"
    },
    {
      id: 11,
      name: "Slaapknuffel Panda",
      shortName: "Panda",
      subtitle: "Zacht wit/zwart, met sterrenprojectie",
      badge: "VROUWEN 60+",
      description: "Voor vrouwen die een heel zacht lichtpatroon op het plafond waarderen tijdens het inslapen.",
      price: 59.95,
      image: "https://customer-assets.emergentagent.com/job_kidssleepaid/artifacts/y20nzqbb_Baby%20Slaapmaatje%20Panda%20%E2%80%93%20Nachtlamp%20met%20Geluiden.png"
    },
    {
      id: 2,
      name: "Slaapknuffel Schaap",
      shortName: "Schaap",
      subtitle: "Extra zachte stof, extra gedimd licht",
      badge: "MEEST ZACHT",
      description: "Voor zeer gevoelige slapers die bijna volledige duisternis willen met alleen een heel zachte gloed.",
      price: 59.95,
      image: "https://customer-assets.emergentagent.com/job_kidssleepaid/artifacts/0p603lsa_Baby%20Nachtlamp%20Schaap%20%E2%80%93%20Projector%20%2B%20White%20Noise.png"
    }
  ];

  // Reviews from women 60+
  const reviews = [
    {
      name: "Marga",
      age: 67,
      duration: "Gebruikt sinds 3 maanden",
      rating: 5,
      text: "\"De opvliegers houden me vaak wakker. Nu zet ik mijn Droomvriendje aan als ik wakker word. Het zachte licht en het rustige geluid helpen me om niet direct weer te gaan piekeren. Ik val vaak binnen een half uur weer in slaap. Dat is een enorme verbetering.\"",
      product: "Star Panda"
    },
    {
      name: "Jannie",
      age: 71,
      duration: "Gebruikt sinds 6 weken",
      rating: 5,
      text: "\"Ik was sceptisch, maar mijn dochter had het voor me gekocht. De eerste week deed het niet veel, maar nu is het echt een fijn ritueel geworden. Ik houd de knuffel vast en het helpt me om mijn gedachten te stoppen met racen. Niet perfect, maar wel veel beter.\"",
      product: "Calm Bear"
    },
    {
      name: "Helena",
      age: 64,
      duration: "Gebruikt sinds 2 maanden",
      rating: 4,
      text: "\"Na mijn scheiding sliep ik heel slecht. De nachten voelden zo lang. Deze knuffel met licht geeft me een veilig gevoel. Ik gebruik het elke avond. Soms slaap ik nog steeds niet direct, maar de nachten voelen minder eenzaam.\"",
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#2d5a3d] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <p className="font-bold text-[#2d5a3d] text-lg">DROOMVRIENDJES</p>
                <p className="text-[#5a8a6a] text-sm">Rustige Nachten voor Volwassen Vrouwen</p>
              </div>
            </div>
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
                Als nachten langer voelen dan dagen — door opvliegers, piekeren, of gewoon omdat uw lichaam anders reageert dan vroeger. U bent niet kapot. U heeft alleen een zacht, veilig ritueel nodig dat zegt: <em>&quot;voor nu, we rusten.&quot;</em>
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
                    src="https://customer-assets.emergentagent.com/job_kidssleepaid/artifacts/a5v4z3yd_Baby%20Nachtlamp%20Beer%20%E2%80%93%20Sterrenprojector%20met%20Muziek.png" 
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
            &quot;Het ligt niet aan u. Het is heel normaal.&quot;
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

      {/* Features Section */}
      <section className="py-16 border-t border-[#e0ebe0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">
            Een zacht ritueel, geen ingewikkeld apparaat.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            U heeft geen nieuwe technologie nodig die u moet leren kennen. U heeft een simpel, betrouwbaar ritueel nodig dat uw lichaam herkent als &quot;tijd om te rusten&quot;.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-6">
              <div className="bg-[#e8f0e8] rounded-xl p-8 mb-4 min-h-[150px] flex items-center justify-center">
                <p className="text-[#7a9a7a] text-sm">Afbeelding: Zachte knuffel met warm licht</p>
              </div>
              <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Warm licht</h3>
              <p className="text-[#5a7a5a]">
                Een zacht, gedimd schijnsel dat u uit de volledige duisternis houdt (als dat onrust geeft) zonder u wakker te maken zoals een telefoonscherm.
              </p>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-6">
              <div className="bg-[#e8f0e8] rounded-xl p-8 mb-4 min-h-[150px] flex items-center justify-center">
                <p className="text-[#7a9a7a] text-sm">Afbeelding: Rustige geluiden knoppen</p>
              </div>
              <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Rustige geluiden</h3>
              <p className="text-[#5a7a5a]">
                Witte ruis en kalmerende geluiden maskeren plotselinge geluiden en geven uw hersenen iets voorspelbaars om op te focussen.
              </p>
            </Card>
            
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-6">
              <div className="bg-[#e8f0e8] rounded-xl p-8 mb-4 min-h-[150px] flex items-center justify-center">
                <p className="text-[#7a9a7a] text-sm">Afbeelding: Zachte knuffel textuur</p>
              </div>
              <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Iets om vast te houden</h3>
              <p className="text-[#5a7a5a]">
                De knuffel zelf geeft uw handen een contactpunt — veel vrouwen voelen zich rustiger met iets zachts vast te houden.
              </p>
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
                  &quot;Geen wonder, geen druk. Gewoon een zachte ondersteuning.&quot;
                </p>
                <p className="text-[#5a7a5a]">
                  We beloven geen &quot;perfecte slaap in 3 dagen&quot;. We beloven wel een zachtere manier om de dag af te sluiten — een die veel vrouwen blijven gebruiken, ook na de eerste nacht.
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
            Uw 10-minuten &quot;tijd-voor-rust&quot; routine.
          </h2>
          <p className="text-lg text-[#5a7a5a] mb-12 max-w-3xl">
            Eenvoudig genoeg voor de moeilijkste dagen. Zacht genoeg dat u zich niet &quot;fout&quot; voelt als het even niet lukt.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-2 border-[#c5d9c8] rounded-2xl p-6">
              <p className="text-sm font-bold text-[#7a9a7a] mb-2">STAP 1</p>
              <h3 className="font-bold text-[#2d5a3d] text-xl mb-3">Zet de druk uit</h3>
              <p className="text-[#5a7a5a]">
                Leg uw telefoon aan de kant. Zeg tegen uzelf: &quot;Voor de komende 20 minuten is niets dringend.&quot; Dit is uw moment.
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
                  <div className="w-12 h-12 bg-[#e8f0e8] rounded-full flex items-center justify-center">
                    <span className="text-xs text-[#7a9a7a]">Foto</span>
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
                
                <p className="text-[#4a6a4a] mb-4 text-sm leading-relaxed">
                  {review.text}
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
            {products.map((product) => (
              <Card key={product.id} className="bg-white border-2 border-[#c5d9c8] rounded-2xl overflow-hidden">
                <div className="bg-[#e8f0e8] p-8 flex items-center justify-center min-h-[200px]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-auto object-contain max-h-[150px]"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-xs font-bold text-[#7a9a7a] mb-1">{product.badge}</p>
                  <h3 className="font-bold text-[#2d5a3d] text-xl mb-1">{product.shortName}</h3>
                  <p className="text-sm text-[#7a9a7a] mb-3">{product.subtitle}</p>
                  <p className="text-[#5a7a5a] text-sm mb-4">{product.description}</p>
                  
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

      {/* Footer */}
      <footer className="bg-[#2d5a3d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Droomvriendjes</h3>
              <p className="text-[#a8c8b0] text-sm">
                Slaapknuffels met nachtlampje en rustgevende geluiden. Voor kinderen én volwassenen die behoefte hebben aan een zacht slaapritueel.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Klantenservice</h3>
              <div className="space-y-2 text-[#a8c8b0] text-sm">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  085 - 123 45 67 (ma-vr 9:00-17:00)
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@droomvriendjes.nl
                </p>
                <p className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  30 dagen uitproeftijd
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Belangrijk</h3>
              <ul className="space-y-2 text-[#a8c8b0] text-sm">
                <li>• Geen medisch hulpmiddel</li>
                <li>• Vervangt geen artsenbezoek</li>
                <li>• Bij ernstige klachten: raadpleeg huisarts</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#3d7a4d] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#a8c8b0] text-sm">
              © 2026 Droomvriendjes. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-[#a8c8b0]">
              <Link to="/privacy" className="hover:text-white">Privacybeleid</Link>
              <Link to="/voorwaarden" className="hover:text-white">Algemene Voorwaarden</Link>
              <Link to="/contact" className="hover:text-white">Impressum</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VrouwenLandingPage;
