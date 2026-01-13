import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Moon, ArrowLeft, Lightbulb } from 'lucide-react';

const NaamBedenkerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" alt="Droomvriendjes" className="h-14 md:h-16 w-auto" />
                
            </Link>
            <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Terug naar Home</Button></Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Lightbulb className="w-20 h-20 text-purple-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Het Verhaal Achter Droomvriendjes</h1>
        </div>
        
        <div className="space-y-8 text-gray-700">
          <section className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">De Oorsprong van de Naam</h2>
            <p className="text-lg leading-relaxed">
              De naam "Droomvriendjes" is ontstaan uit de combinatie van twee belangrijke elementen: 
              "Ouji" (Japans voor 'prins') en "Kidz" (kinderen). Deze naam symboliseert dat elk 
              kind koninklijk behandeld moet worden, vooral als het gaat om rust en slaap.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Ons Verhaal</h2>
            <p className="mb-4">
              Droomvriendjes is geboren uit persoonlijke ervaring. Als ouders hebben wij zelf de uitdagingen 
              meegemaakt van kinderen die moeite hadden met slapen. Nachten vol onrust, overprikkeling 
              en de constante zoektocht naar oplossingen.
            </p>
            <p className="mb-4">
              We ontdekten dat de combinatie van zachte lichten, rustgevende geluiden en een knuffelbaar 
              object wonderen kon verrichten. Maar we vonden niet wat we zochten op de markt. Dus 
              besloten we het zelf te maken.
            </p>
            <p>
              Zo ontstond Droomvriendjes: kalmerende knuffels die kinderen (en hun ouders!) helpen om tot 
              rust te komen en beter te slapen.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 border-2 border-purple-100">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Onze Missie</h2>
            <p className="text-lg">
              Elk kind verdient een goede nachtrust. Onze missie is om zoveel mogelijk gezinnen te 
              helpen met producten die wetenschappelijk onderbouwd zijn en met liefde gemaakt. Want 
              beter slapen betekent een gelukkiger kind, en gelukkigere ouders.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Waarom Droomvriendjes Werkt</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 text-xl">•</span>
                <span><strong>Wetenschappelijk onderbouwd:</strong> Gebaseerd op onderzoek naar slaap en ontspanning</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 text-xl">•</span>
                <span><strong>Veilig getest:</strong> CE-gecertificeerd en voldoet aan alle Europese normen</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 text-xl">•</span>
                <span><strong>Door ouders, voor ouders:</strong> We begrijpen de uitdagingen omdat we ze zelf hebben meegemaakt</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 text-xl">•</span>
                <span><strong>Bewezen resultaat:</strong> 86% van de kinderen slaapt beter met Droomvriendjes</span>
              </li>
            </ul>
          </section>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Word Deel van de Droomvriendjes Familie</h2>
            <p className="text-xl mb-6">Sluit je aan bij meer dan 1000+ tevreden gezinnen</p>
            <Link to="/"><Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">Ontdek Onze Knuffels</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaamBedenkerPage;