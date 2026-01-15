import React from 'react';
import Layout from '../components/Layout';

const PrivacyPage = () => {
  return (
    <Layout backButtonText="Terug naar Home">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Privacy Beleid</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <p className="mb-4">
              Droomvriendjes, gevestigd aan SCHAESBERGERWEG 103, 6415 AD Heerlen, is verantwoordelijk voor de verwerking 
              van persoonsgegevens zoals weergegeven in deze privacyverklaring.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Contactgegevens</h2>
            <div className="bg-purple-50 rounded-xl p-6">
              <p><strong>Droomvriendjes</strong></p>
              <p>SCHAESBERGERWEG 103</p>
              <p>6415 AD Heerlen</p>
              <p>KVK: 9921083</p>
              <p>Email: info@droomvriendjes.nl</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Persoonsgegevens die wij verwerken</h2>
            <p className="mb-4">Droomvriendjes verwerkt je persoonsgegevens doordat je gebruik maakt van onze diensten en/of omdat je deze gegevens zelf aan ons verstrekt.</p>
            <p className="mb-2">Hieronder vind je een overzicht van de persoonsgegevens die wij verwerken:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Voor- en achternaam</li>
              <li>Adresgegevens</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres</li>
              <li>IP-adres</li>
              <li>Overige persoonsgegevens die je actief verstrekt in correspondentie en telefonisch</li>
              <li>Gegevens over jouw activiteiten op onze website</li>
              <li>Bankrekeningnummer</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Waarom we gegevens nodig hebben</h2>
            <p className="mb-2">Droomvriendjes verwerkt jouw persoonsgegevens voor de volgende doelen:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Het afhandelen van jouw bestelling</li>
              <li>Verzenden van onze producten</li>
              <li>Je te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
              <li>Je te informeren over wijzigingen van onze diensten en producten</li>
              <li>Je de mogelijkheid te bieden een account aan te maken</li>
              <li>Om goederen en diensten bij je af te leveren</li>
              <li>Droomvriendjes analyseert jouw gedrag op de website om daarmee de website te verbeteren en het aanbod van producten en diensten af te stemmen op jouw voorkeuren</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Hoe lang we gegevens bewaren</h2>
            <p>
              Droomvriendjes bewaart je persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren 
              waarvoor je gegevens worden verzameld. Wij hanteren de volgende bewaartermijnen:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Bestelgegevens: 7 jaar (wettelijke verplichting)</li>
              <li>Accountgegevens: zolang je account actief is</li>
              <li>Nieuwsbriefgegevens: tot je je afmeldt</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Delen met derden</h2>
            <p className="mb-4">
              Droomvriendjes verstrekt uitsluitend aan derden en alleen als dit nodig is voor de uitvoering van onze 
              overeenkomst met jou of om te voldoen aan een wettelijke verplichting.
            </p>
            <p>Met bedrijven die jouw gegevens verwerken in onze opdracht, sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van jouw gegevens.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Cookies</h2>
            <p className="mb-4">
              Droomvriendjes gebruikt functionele, analytische en tracking cookies. Een cookie is een klein tekstbestand 
              dat bij het eerste bezoek aan deze website wordt opgeslagen in de browser van je computer, tablet 
              of smartphone. De cookies die wij gebruiken zijn noodzakelijk voor de technische werking van de 
              website en jouw gebruiksgemak.
            </p>
            <p>
              Je kunt je afmelden voor cookies door je internetbrowser zo in te stellen dat deze geen cookies 
              meer opslaat. Daarnaast kun je ook alle informatie die eerder is opgeslagen via de instellingen 
              van je browser verwijderen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Jouw rechten</h2>
            <p className="mb-4">Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heb je het recht om je eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens door Droomvriendjes.</p>
            <p className="mb-4">Je hebt het recht op gegevensoverdraagbaarheid. Dat betekent dat je bij ons een verzoek kan indienen om de persoonsgegevens die wij van jou beschikken in een computerbestand naar jou of een ander, door jou genoemde organisatie, te sturen.</p>
            <p>
              Wil je gebruik maken van je recht op bezwaar en/of recht op gegevensoverdraagbaarheid of heb je 
              andere vragen/opmerkingen over de gegevensverwerking, stuur dan een gespecificeerd verzoek naar 
              info@droomvriendjes.nl.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Beveiliging</h2>
            <p>
              Droomvriendjes neemt de bescherming van jouw gegevens serieus en neemt passende maatregelen om misbruik, 
              verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. 
              Als jij het idee hebt dat jouw gegevens toch niet goed beveiligd zijn of er aanwijzingen zijn van 
              misbruik, neem dan contact op via info@droomvriendjes.nl.
            </p>
          </section>

          <section className="bg-purple-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Vragen?</h2>
            <p className="mb-4">
              Heb je vragen over ons privacybeleid? Neem dan contact met ons op:
            </p>
            <p>Email: info@droomvriendjes.nl</p>
            <p>KVK: 9921083</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
