import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Moon, ArrowLeft, Sparkles } from 'lucide-react';

const HSPPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" alt="Droomvriendjes" className="h-10 md:h-12" />
                <span className="text-2xl font-bold text-purple-900">Droomvriendjes</span>
            </Link>
            <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Terug</Button></Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Hoogsensitiviteit (HSP)</h1>
        
        <div className="space-y-8 text-gray-700">
          <p className="text-lg">Ongeveer 15-20% van alle kinderen is hoogsensitief. Deze kinderen ervaren prikkels intensiever en hebben meer tijd nodig om indrukken te verwerken.</p>

          <section className="bg-purple-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Kenmerken van Hoogsensitieve Kinderen</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Diep nadenken over dingen</li>
              <li>Snel overprik keld door drukte, geluid of licht</li>
              <li>Sterk empathisch vermogen</li>
              <li>Gevoelig voor subtiele veranderingen in de omgeving</li>
              <li>Sterke emotionele reacties</li>
              <li>Moeite met grote veranderingen</li>
            </ul>
          </section>

          <h2 className="text-3xl font-bold text-purple-900">Droomvriendjes voor HSP Kinderen</h2>
          <p className="mb-6">Hoogsensitieve kinderen hebben extra ondersteuning nodig bij het verwerken van prikkels. Onze knuffels zijn ideaal voor HSP kinderen omdat ze:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-purple-100">
              <CardContent className="pt-6">
                <h3 className="font-bold text-purple-900 mb-2">Voorspelbare Prikkels</h3>
                <p className="text-gray-600">De zachte lichten en geluiden zijn voorspelbaar en niet overweldigend</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100">
              <CardContent className="pt-6">
                <h3 className="font-bold text-purple-900 mb-2">Down-time</h3>
                <p className="text-gray-600">Helpen om tot rust te komen na een dag vol prikkels</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-pink-100">
              <CardContent className="pt-6">
                <h3 className="font-bold text-purple-900 mb-2">Emotieregulatie</h3>
                <p className="text-gray-600">Ondersteunen bij het verwerken van intense emoties</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-100">
              <CardContent className="pt-6">
                <h3 className="font-bold text-purple-900 mb-2">Veilige Haven</h3>
                <p className="text-gray-600">Bieden een plek van rust en veiligheid</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Tips voor Ouders van HSP Kinderen</h2>
            <ul className="space-y-2">
              <li>• Plan rustige momenten in na drukke activiteiten</li>
              <li>• Gebruik de Droomvriendjes knuffel als vast onderdeel van het avondritueel</li>
              <li>• Accepteer en erken de gevoeligheid van je kind</li>
              <li>• Zorg voor een rustige, geordende slaapomgeving</li>
              <li>• Beperk prikkels voor het slapengaan (geen schermen, gedempte verlichting)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Speciaal voor Hoogsensitieve Kinderen</h2>
            <p className="mb-6">Ontdek hoe Droomvriendjes kan helpen bij het verwerken van prikkels</p>
            <Link to="/"><Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">Bekijk Onze Knuffels</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSPPage;