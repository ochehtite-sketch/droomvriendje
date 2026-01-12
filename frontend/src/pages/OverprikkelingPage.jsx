import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Moon, ArrowLeft, Sparkles } from 'lucide-react';

const OverprikkelingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_kidssleepaid/artifacts/nggirrob_Schermopname_12-1-2026_16586_chatgpt.com.jpeg" 
                alt="OujiKidz Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <Link to="/">
              <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Terug</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Prikkelverwerking & Overprikkeling</h1>
        
        <div className="space-y-8 text-gray-700">
          <p className="text-lg">Overprikkeling ontstaat wanneer kinderen te veel zintuiglijke prikkels tegelijk moeten verwerken. Dit kan leiden tot moeheid, prikkelbaarheid en slaapproblemen.</p>

          <section className="bg-purple-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Signalen van Overprikkeling</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Overgevoeligheid voor geluiden, licht of aanraking</li>
              <li>Moeite met in slaap vallen na een drukke dag</li>
              <li>Huilbuien zonder duidelijke aanleiding</li>
              <li>Onrustig gedrag of hyperactiviteit</li>
              <li>Terugtrekken en behoefte aan alleen zijn</li>
            </ul>
          </section>

          <h2 className="text-3xl font-bold text-purple-900">Hoe OujiKidz Helpt</h2>
          <p>Onze knuffels bieden een rustige, voorspelbare prikkel die helpt bij het verwerken van alle indrukken van de dag. De zachte lichten en kalmerende geluiden creëren een veilige omgeving waarin je kind tot rust kan komen.</p>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Minder Prikkels, Meer Rust</h2>
            <Link to="/">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">Ontdek Onze Oplossing</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverprikkelingPage;