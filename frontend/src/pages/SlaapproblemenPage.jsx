import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Moon, ArrowLeft, BedDouble } from 'lucide-react';

const SlaapproblemenPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <Moon className="w-10 h-10 text-purple-600" />
                <span className="text-2xl font-bold text-purple-900">Droomvriendjes</span>
            </Link>
            <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Terug</Button></Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Slaapproblemen bij Kinderen</h1>
        
        <div className="space-y-8 text-gray-700">
          <p className="text-lg">Ongeveer 25% van alle kinderen heeft last van slaapproblemen. Dit kan variëren van moeite met in slaap vallen tot regelmatig wakker worden in de nacht.</p>

          <section className="bg-purple-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Veel Voorkomende Slaapproblemen</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Moeite met in slaap vallen (> 30 minuten)</li>
              <li>Regelmatig wakker worden 's nachts</li>
              <li>Nachtmerries of nachtangsten</li>
              <li>Te vroeg wakker worden</li>
              <li>Onrustige slaap</li>
            </ul>
          </section>

          <h2 className="text-3xl font-bold text-purple-900">De Droomvriendjes Slaapaanpak</h2>
          <p className="mb-4">Onze knuffels zijn specifiek ontworpen om slaapproblemen aan te pakken:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-purple-100">
              <h3 className="font-bold text-purple-900 mb-2">Stap 1: Ontspanning</h3>
              <p className="text-sm">Zacht licht en rustgevende muziek helpen het lichaam te ontspannen</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-blue-100">
              <h3 className="font-bold text-purple-900 mb-2">Stap 2: Routine</h3>
              <p className="text-sm">Vaste avondritueel signaleert aan het lichaam dat het bedtijd is</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-pink-100">
              <h3 className="font-bold text-purple-900 mb-2">Stap 3: Veiligheid</h3>
              <p className="text-sm">De knuffel biedt troost en een gevoel van veiligheid</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-green-100">
              <h3 className="font-bold text-purple-900 mb-2">Stap 4: Beter Slapen</h3>
              <p className="text-sm">Sneller in slaap vallen en langer doorslapen</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <BedDouble className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">86% Slaapt Beter</h2>
            <p className="mb-6">Met Droomvriendjes valt je kind sneller in slaap en slaapt beter door</p>
            <Link to="/"><Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">Probeer Nu</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlaapproblemenPage;