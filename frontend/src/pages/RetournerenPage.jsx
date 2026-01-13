import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Moon, ArrowLeft, PackageCheck, Clock, RefreshCw, Mail } from 'lucide-react';

const RetournerenPage = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Retourneren & Ruilen</h1>
        
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-900 mb-2">30 Dagen Niet Goed = Geld Terug!</h2>
          <p className="text-gray-700">
            Bij Droomvriendjes mag je je bestelling binnen 30 dagen retourneren. Zonder gedoe, gratis retour!
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Hoe werkt retourneren?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="font-bold text-purple-900 mb-2">Meld je retour</h3>
                  <p className="text-sm text-gray-600">Stuur een email naar info@droomvriendjes.nl</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="font-bold text-purple-900 mb-2">Ontvang retourlabel</h3>
                  <p className="text-sm text-gray-600">Wij sturen je een gratis retourlabel</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pink-600">3</span>
                  </div>
                  <h3 className="font-bold text-purple-900 mb-2">Verstuur pakket</h3>
                  <p className="text-sm text-gray-600">Doe het product in de doos en verstuur</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">4</span>
                  </div>
                  <h3 className="font-bold text-purple-900 mb-2">Geld terug</h3>
                  <p className="text-sm text-gray-600">Binnen 5 werkdagen krijg je je geld terug</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 border-2 border-purple-100">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Belangrijke Informatie</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Retourperiode</h3>
                  <p className="text-gray-600">Je hebt 30 dagen na ontvangst om je product te retourneren.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <PackageCheck className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Staat van het product</h3>
                  <p className="text-gray-600">Het product moet in originele staat zijn, ongebruikt en in de originele verpakking.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <RefreshCw className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Terugbetaling</h3>
                  <p className="text-gray-600">Na ontvangst en controle krijg je binnen 5 werkdagen je geld terug op dezelfde manier als je hebt betaald.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-6 h-6 text-pink-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Contact opnemen</h3>
                  <p className="text-gray-600">Stuur een email naar <a href="mailto:info@droomvriendjes.nl" className="text-purple-600 hover:underline">info@droomvriendjes.nl</a> met je bestelnummer en de reden van retour.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Veelgestelde Vragen over Retourneren</h2>
            <div className="space-y-4">
              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-purple-900 mb-2">Zijn retourkosten gratis?</h3>
                  <p className="text-gray-600">Ja! Bij Droomvriendjes is retourneren altijd gratis. We sturen je een gratis retourlabel.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-purple-900 mb-2">Kan ik ruilen voor een ander product?</h3>
                  <p className="text-gray-600">Ja, dat kan! Stuur een email naar info@droomvriendjes.nl en geef aan welk product je wilt ruilen.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-purple-900 mb-2">Wat als het product beschadigd is?</h3>
                  <p className="text-gray-600">Neem direct contact met ons op via info@droomvriendjes.nl. We lossen dit zo snel mogelijk voor je op!</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-purple-900 mb-2">Retouradres</h3>
                  <p className="text-gray-600">Het retouradres ontvang je per email na aanmelding van je retour. Stuur NIET naar ons vestigingsadres!</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Hulp Nodig?</h2>
            <p className="text-lg mb-6">Ons klantenservice team staat voor je klaar!</p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Neem Contact Op
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetournerenPage;