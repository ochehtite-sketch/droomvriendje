import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Moon, ArrowLeft, Heart, Users, Award } from 'lucide-react';

const OverOnsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" alt="Droomvriendjes" className="h-14 md:h-16 w-auto" />
                
            </Link>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Over Droomvriendjes</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Onze Missie</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bij Droomvriendjes geloven we dat elk kind recht heeft op een rustige, ontspannen nachtrust. 
              Onze missie is om ouders en kinderen te helpen met innovatieve, veilige en effectieve 
              slaaphulpmiddelen die bijdragen aan beter slapen, minder stress en meer rust.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
              <Heart className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-purple-900 mb-2">Met Liefde Gemaakt</h3>
              <p className="text-gray-600">Elk product wordt met zorg ontwikkeld en getest voor optimale veiligheid en kwaliteit.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-purple-900 mb-2">Familie Gedreven</h3>
              <p className="text-gray-600">We begrijpen de uitdagingen van ouderschap en werken dagelijks aan oplossingen.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
              <Award className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-bold text-purple-900 mb-2">Hoogste Kwaliteit</h3>
              <p className="text-gray-600">CE-gecertificeerd en volgens de strengste Europese veiligheidsnormen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Ons Verhaal</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Droomvriendjes is ontstaan uit persoonlijke ervaring met slaapproblemen bij jonge kinderen. 
              Als ouders hebben we gezien hoe moeilijk het kan zijn wanneer je kind moeite heeft met 
              in slaap vallen, overprikkeld is of last heeft van angst.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We begonnen met onderzoek naar wat kinderen echt helpt om tot rust te komen. Dit leidde 
              tot de ontwikkeling van onze unieke knuffels met kalmerende licht- en muziekfuncties. 
              Inmiddels helpen we meer dan 1000+ gezinnen met betere nachten.
            </p>
          </section>

          <section className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Waarom Droomvriendjes?</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">✓</span>
                <span>Wetenschappelijk onderbouwde ontspanningstechnieken</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">✓</span>
                <span>Veilig en getest volgens Europese normen (CE-gecertificeerd)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">✓</span>
                <span>30 dagen niet goed = geld terug garantie</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">✓</span>
                <span>Uitstekende klantenservice en persoonlijk advies</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">✓</span>
                <span>4.5/5 sterren van 1000+ tevreden klanten</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Contact</h2>
            <p className="text-lg text-gray-700 mb-4">
              Heb je vragen of wil je meer weten? Neem gerust contact met ons op!
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Neem Contact Op
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OverOnsPage;