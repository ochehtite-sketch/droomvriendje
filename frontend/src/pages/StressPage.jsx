import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Moon, ArrowLeft, Heart, CheckCircle } from 'lucide-react';

const StressPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" alt="Droomvriendjes" className="h-10 md:h-12" />
                <span className="text-2xl font-bold text-purple-900">Droomvriendjes</span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Stressvermindering bij Kinderen</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <p className="text-lg leading-relaxed">
              Stress bij kinderen is steeds vaker voorkomend. Of het nu gaat om schoolprestaties, 
              sociale druk of gewoon een overvolle agenda - kinderen ervaren stress net als volwassenen, 
              maar kunnen dit vaak niet goed uiten.
            </p>
          </section>

          <section className="bg-purple-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Signalen van Stress bij Kinderen</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Slaapproblemen of nachtmerries</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Buikpijn of hoofdpijn zonder duidelijke oorzaak</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Prikkelbaar gedrag of huilbuien</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Terugtrekken uit sociale situaties</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Concentratieproblemen</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Hoe Helpen Droomvriendjes Knuffels?</h2>
            <p className="mb-4">
              Onze kalmerende knuffels zijn speciaal ontworpen om stress bij kinderen te verminderen:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-purple-900 mb-2">Rustgevend Licht</h3>
                  <p className="text-gray-600">Zachte, warme lichtjes helpen het lichaam te ontspannen en signaleren dat het tijd is om tot rust te komen.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-purple-900 mb-2">Kalmerende Muziek</h3>
                  <p className="text-gray-600">Speciaal geselecteerde geluiden en melodieën die wetenschappelijk bewezen het stressniveau verlagen.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-100">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-purple-900 mb-2">Fysiek Contact</h3>
                  <p className="text-gray-600">Het knuffelen van een zachte knuffel stimuleert de productie van oxytocine, het 'knuffelhormoon'.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-purple-900 mb-2">Veiligheidsgevoel</h3>
                  <p className="text-gray-600">Een vertrouwde knuffel geeft kinderen een gevoel van veiligheid en geborgenheid, vooral in stressvolle momenten.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Tips voor Ouders</h2>
            <ol className="space-y-3">
              <li><strong>1. Herken de signalen:</strong> Let op veranderingen in gedrag en slaappatronen</li>
              <li><strong>2. Creëer een rustig moment:</strong> Gebruik de Droomvriendjes knuffel in een vast avondritueel</li>
              <li><strong>3. Praat erover:</strong> Laat je kind vertellen over zijn of haar dag en zorgen</li>
              <li><strong>4. Beperk schermtijd:</strong> Vooral in de uren voor het slapengaan</li>
              <li><strong>5. Blijf consistent:</strong> Een vaste routine geeft rust en voorspelbaarheid</li>
            </ol>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Wetenschappelijke Onderbouwing</h2>
            <p className="mb-4">
              Onderzoek toont aan dat het gebruik van multi-sensorische hulpmiddelen zoals onze kalmerende 
              knuffels significant bijdraagt aan stressvermindering bij kinderen. De combinatie van tactiele 
              stimulatie (knuffelen), visuele rust (zacht licht) en auditieve kalmte (rustgevende geluiden) 
              activeert het parasympathische zenuwstelsel.
            </p>
            <p>
              Dit zorgt ervoor dat het lichaam overgaat van de 'vechten-of-vluchten' modus naar een 
              ontspannen staat, wat essentieel is voor een goede nachtrust en algemeen welzijn.
            </p>
          </section>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Klaar om Stress te Verminderen?</h2>
            <p className="text-lg mb-6">Ontdek hoe onze kalmerende knuffels jouw kind kunnen helpen</p>
            <Link to="/">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Bekijk Onze Knuffels
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressPage;