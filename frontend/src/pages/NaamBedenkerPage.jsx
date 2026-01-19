import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Heart, Shield, Moon, Star, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

const NaamBedenkerPage = () => {
  return (
    <Layout backButtonText="Terug naar Home">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4">
            Het Verhaal Achter Droomvriendjes
          </h1>
          <p className="text-lg text-purple-600 font-medium">
            Slaapknuffels voor Rustiger Slapen
          </p>
        </div>

        {/* Waarom Droomvriendjes Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">Waarom Droomvriendjes?</h2>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 mb-4 leading-relaxed">
              Herken je dit? Lange nachten, een huilend kindje dat maar niet tot rust komt, en het gevoel dat je alles al hebt geprobeerd. Wij snappen het, want wij hebben het zelf meegemaakt.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Droomvriendjes is ontstaan uit liefde en noodzaak. Als ouders van kinderen die moeite hadden met inslapen, gingen we op zoek naar een oplossing. We ontdekten dat de combinatie van zacht licht, kalmerende geluiden en een knuffelvriend wonderen kan verrichten voor de slaap van kinderen.
            </p>
            <p className="text-gray-700 font-semibold">
              Het probleem? Dit product bestond nog niet. Dus maakten we het zelf.
            </p>
          </div>
        </section>

        {/* Missie Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            Onze Missie: Betere Nachten voor het Hele Gezin
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Elk kind verdient een goede nachtrust. En elke ouder ook. Daarom hebben we Droomvriendjes ontwikkeld: kalmerende slaapknuffels die kinderen helpen ontspannen en beter slapen.
          </p>
          <p className="text-gray-700 mb-6">
            Onze knuffels combineren drie bewezen elementen voor rustgevende slaap:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border-2 border-purple-100 text-center">
              <Moon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Zacht nachtlampje</h3>
              <p className="text-sm text-gray-600">Geeft geborgenheid zonder te prikkelen</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-blue-100 text-center">
              <Star className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Rustgevende geluiden</h3>
              <p className="text-sm text-gray-600">White noise, hartslag en natuurgeluiden</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-pink-100 text-center">
              <Heart className="w-10 h-10 text-pink-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Knuffelbaar object</h3>
              <p className="text-sm text-gray-600">Veiligheid en comfort in één</p>
            </div>
          </div>
        </section>

        {/* Waarom Kiezen Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            Waarom Ouders Kiezen voor Droomvriendjes
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-purple-100">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Wetenschappelijk onderbouwd</span>
                  <span className="text-gray-600"> - Ontwikkeld op basis van slaaponderzoek</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">100% veilig</span>
                  <span className="text-gray-600"> - CE-gecertificeerd en voldoet aan alle Europese veiligheidsnormen</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Door ouders, voor ouders</span>
                  <span className="text-gray-600"> - Wij begrijpen de uitdagingen van slapeloze nachten</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Bewezen effectief</span>
                  <span className="text-gray-600"> - 86% van de kinderen slaapt rustiger met Droomvriendjes</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Geschikt voor alle leeftijden</span>
                  <span className="text-gray-600"> - Van baby tot peuter en kleuter</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Naam Betekenis Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
            De Betekenis van Onze Naam
          </h2>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed">
              Droomvriendjes combineert 'Ouji' (Japans voor prins) en 'Kidz' (kinderen). Want elk kind verdient koninklijke rust en de beste slaap.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Word Deel van Onze Familie</h2>
          <p className="text-lg mb-6 opacity-90">
            Sluit je aan bij meer dan 1.000 tevreden Nederlandse gezinnen die elke nacht beter slapen dankzij Droomvriendjes.
          </p>
          <Link to="/knuffels">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8">
              Ontdek Onze Slaapknuffels
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm mt-6 opacity-80">
            Gratis verzending vanaf €35 | 14 dagen niet goed, geld terug
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default NaamBedenkerPage;
