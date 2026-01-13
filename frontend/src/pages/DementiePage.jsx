import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Moon, ArrowLeft, Heart } from 'lucide-react';

const DementiePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" alt="Droomvriendjes" className="h-20 md:h-24 w-auto" />
                
            </Link>
            <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Terug</Button></Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Troost bij Dementie</h1>
        
        <div className="space-y-8 text-gray-700">
          <p className="text-lg">Hoewel Droomvriendjes oorspronkelijk voor kinderen is ontwikkeld, blijken onze kalmerende knuffels ook waardevol voor mensen met dementie. De vertrouwde zachtheid en rustgevende prikkels kunnen troost en geborgenheid bieden.</p>

          <section className="bg-purple-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Voordelen voor Mensen met Dementie</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Vermindert angst en onrust</li>
              <li>Biedt tactiele stimulatie</li>
              <li>Helpt bij ontspanning</li>
              <li>Geeft een gevoel van veiligheid</li>
              <li>Kan helpen bij slaapproblemen</li>
              <li>Ondersteunt emotioneel welzijn</li>
            </ul>
          </section>

          <h2 className="text-3xl font-bold text-purple-900">Hoe Werkt Het?</h2>
          <p className="mb-4">De zachte materialen, rustgevende lichten en kalmerende geluiden van Droomvriendjes knuffels kunnen mensen met dementie helpen om:</p>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>Tot rust te komen in onrustige momenten</li>
            <li>Zich verbonden te voelen door het knuffelen</li>
            <li>Beter in slaap te vallen</li>
            <li>Positieve emoties te ervaren</li>
          </ul>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Tips voor Mantelzorgers</h2>
            <ul className="space-y-2">
              <li>• Introduceer de knuffel rustig en zonder druk</li>
              <li>• Gebruik de knuffel op vaste momenten (bijv. voor het slapen)</li>
              <li>• Laat de persoon zelf de functie bedienen als dat mogelijk is</li>
              <li>• Observeer welke lichten en geluiden het beste werken</li>
              <li>• Combineer met andere vertrouwde rituelen</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center mt-8">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Troost voor Alle Leeftijden</h2>
            <p className="mb-6">Droomvriendjes biedt geborgenheid en rust, ook voor ouderen</p>
            <Link to="/"><Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">Meer Informatie</Button></Link>
          </div>

          <div className="text-sm text-gray-600 italic mt-8">
            <p>Let op: Droomvriendjes is geen medisch hulpmiddel en vervangt geen professionele zorg. Raadpleeg altijd een arts of zorgprofessional voor medisch advies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DementiePage;