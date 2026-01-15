import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Heart } from 'lucide-react';
import Layout from '../components/Layout';

const TroostPage = () => {
  return (
    <Layout backButtonText="Terug">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Troost Vinden</h1>
        
        <div className="space-y-8 text-gray-700">
          <p className="text-lg">Kinderen hebben behoefte aan troost, vooral in moeilijke momenten. Een knuffel kan een belangrijk bron van troost zijn wanneer ouders er even niet zijn.</p>

          <section className="bg-purple-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Wanneer Hebben Kinderen Troost Nodig?</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Bij verdriet of teleurstelling</li>
              <li>Tijdens ziekte of pijn</li>
              <li>Bij grote veranderingen (verhuizing, nieuwe school)</li>
              <li>Wanneer ze zich onzeker voelen</li>
              <li>Voor het slapen gaan</li>
            </ul>
          </section>

          <h2 className="text-3xl font-bold text-purple-900">De Kracht van een Troostknuffel</h2>
          <p>Onze Droomvriendjes knuffels bieden meer dan alleen fysieke troost. Door de zachte lichten en kalmerende geluiden creëren ze een omgeving van veiligheid en geborgenheid. Dit helpt kinderen om emoties te verwerken en zich weer goed te voelen.</p>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center mt-8">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Altijd Troost Binnen Handbereik</h2>
            <Link to="/">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">Ontdek Onze Knuffels</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TroostPage;
