import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Moon, ArrowLeft, Shield } from 'lucide-react';

const AngstPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <Moon className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-900">OujiKidz</span>
            </Link>
            <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Terug</Button></Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Angstvermindering bij Kinderen</h1>
        
        <div className="space-y-8 text-gray-700">
          <p className="text-lg">Angst bij kinderen kan zich op verschillende manieren uiten. Van nachtmerries tot separatieangst - het is belangrijk om je kind te helpen zich veilig te voelen.</p>

          <section className="bg-purple-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Vormen van Angst bij Kinderen</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Angst voor het donker</li>
              <li>Separatieangst (angst om van ouders gescheiden te zijn)</li>
              <li>Sociale angst</li>
              <li>Specifieke fo bieën (spinnen, onweer, etc.)</li>
              <li>Algemene ongerustheid</li>
            </ul>
          </section>

          <h2 className="text-3xl font-bold text-purple-900">Hoe OujiKidz Helpt bij Angst</h2>
          <p className="mb-4">Onze kalmerende knuffels bieden een fysiek ankerpunt voor angstige kinderen:</p>
          <ul className="space-y-3 list-disc list-inside">
            <li><strong>Zacht licht</strong> neemt de angst voor het donker weg</li>
            <li><strong>Rustgevende geluiden</strong> leiden de aandacht af van angstge gedachten</li>
            <li><strong>Fysieke troost</strong> door het zachte, knuffelbare materiaal</li>
            <li><strong>Voorspelbaarheid</strong> door een vast avondritueel met de knuffel</li>
          </ul>

          <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Veiligheid & Geborgenheid</h2>
            <p className="mb-6">Help je kind angst te overwinnen met onze kalmerende knuffels</p>
            <Link to="/"><Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">Bekijk Producten</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AngstPage;