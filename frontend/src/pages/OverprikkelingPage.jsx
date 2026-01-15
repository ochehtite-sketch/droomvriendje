import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles } from 'lucide-react';
import Layout from '../components/Layout';

const OverprikkelingPage = () => {
  return (
    <Layout backButtonText="Terug">
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

          <h2 className="text-3xl font-bold text-purple-900">Hoe Droomvriendjes Helpt</h2>
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
    </Layout>
  );
};

export default OverprikkelingPage;
