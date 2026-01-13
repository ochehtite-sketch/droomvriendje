import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Moon, ArrowLeft } from 'lucide-react';

const VoorwaardenPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://customer-assets.emergentagent.com/job_droomvriendjes-clone/artifacts/vo9pb3ti_LOGO%20DROOMVRIENDJES.png" alt="Droomvriendjes" className="h-20 md:h-24 w-auto" />
                
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
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Algemene Voorwaarden</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 1 - Definities</h2>
            <p className="mb-2">In deze voorwaarden wordt verstaan onder:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Ondernemer:</strong> Droomvriendjes, gevestigd aan SCHAESBERGERWEG 103, 6415 AD Heerlen, KVK: 9921083</li>
              <li><strong>Consument:</strong> de natuurlijke persoon die niet handelt in de uitoefening van beroep or bedrijf</li>
              <li><strong>Overeenkomst:</strong> de overeenkomst tussen de ondernemer en de consument</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 2 - Identiteit van de ondernemer</h2>
            <div className="bg-purple-50 rounded-xl p-6">
              <p><strong>Droomvriendjes</strong></p>
              <p>SCHAESBERGERWEG 103</p>
              <p>6415 AD Heerlen</p>
              <p>Nederland</p>
              <p className="mt-4">E-mailadres: info@droomvriendjes.nl</p>
              <p>KVK-nummer: 9921083</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 3 - Toepasselijkheid</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Deze algemene voorwaarden zijn van toepassing op elk aanbod van de ondernemer en op elke tot stand gekomen overeenkomst tussen ondernemer en consument.</li>
              <li>Voordat de overeenkomst wordt gesloten, wordt de tekst van deze algemene voorwaarden aan de consument beschikbaar gesteld.</li>
              <li>Indien dit redelijkerwijs niet mogelijk is, zal de ondernemer aangeven op welke wijze de algemene voorwaarden zijn in te zien en dat zij op verzoek van de consument zo spoedig mogelijk kosteloos worden toegezonden.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 4 - Het aanbod</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Het aanbod bevat een volledige en nauwkeurige omschrijving van de aangeboden producten en/of diensten.</li>
              <li>De beschrijving is voldoende gedetailleerd om een goede beoordeling van het aanbod door de consument mogelijk te maken.</li>
              <li>De door de ondernemer gebruikte afbeeldingen zijn een waarheidsgetrouwe weergave van de aangeboden producten.</li>
              <li>Kennelijke vergissingen of kennelijke fouten in het aanbod binden de ondernemer niet.</li>
              <li>Elk aanbod bevat zodanige informatie, dat voor de consument duidelijk is wat de rechten en verplichtingen zijn, die aan de aanvaarding van het aanbod zijn verbonden.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 5 - De overeenkomst</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>De overeenkomst komt, onder voorbehoud van het bepaalde in lid 4, tot stand op het moment van aanvaarding door de consument van het aanbod en het voldoen aan de daarbij gestelde voorwaarden.</li>
              <li>Indien de consument het aanbod langs elektronische weg heeft aanvaard, bevestigt de ondernemer onverwijld langs elektronische weg de ontvangst van de aanvaarding van het aanbod.</li>
              <li>Indien de overeenkomst elektronisch tot stand komt, treft de ondernemer passende technische en organisatorische maatregelen ter beveiliging van de elektronische overdracht van data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 6 - Herroepingsrecht</h2>
            <div className="bg-green-50 rounded-xl p-6 mb-4">
              <p className="font-bold text-green-900 mb-2">14 dagen bedenktijd (wettelijk herroepingsrecht)</p>
              <p>De consument kan een overeenkomst met betrekking tot de aankoop van een product gedurende een bedenktijd van 14 dagen zonder opgave van redenen ontbinden, conform de Europese wetgeving voor online aankopen.</p>
            </div>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>De bedenktijd gaat in op de dag na ontvangst van het product door de consument.</li>
              <li>Tijdens de bedenktijd zal de consument zorgvuldig omgaan met het product en de verpakking.</li>
              <li>Hij zal het product slechts uitpakken of gebruiken in de mate die nodig is om de aard, de kenmerken en de werking van het product vast te stellen.</li>
              <li>Indien de consument gebruik maakt van zijn herroepingsrecht, zal hij het product met alle geleverde toebehoren en - indien redelijkerwijze mogelijk - in de originele staat en verpakking aan de ondernemer retourneren.</li>
              <li>Retourkosten zijn voor rekening van de consument, tenzij anders overeengekomen.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 6a - Geld-terug-garantie bij defecten</h2>
            <div className="bg-blue-50 rounded-xl p-6 mb-4">
              <p className="font-bold text-blue-900 mb-2">Defect? Geld terug!</p>
              <p>Je hebt recht op terugbetaling of kosteloze vervanging wanneer het product defect is bij ontvangst of binnen de garantieperiode een fabricagefout vertoont.</p>
            </div>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>De geld-terug-garantie is van toepassing bij aantoonbare defecten of schade bij levering.</li>
              <li>Voor overige retouren geldt het wettelijke herroepingsrecht (14 dagen) zoals vermeld in Artikel 6.</li>
              <li>Bij defecten neem je contact op via info@droomvriendjes.nl met foto's van het defect.</li>
              <li>Na goedkeuring ontvang je een retourlabel en wordt het aankoopbedrag binnen 14 dagen teruggestort.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 7 - De prijs</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Gedurende de in het aanbod vermelde geldigheidsduur worden de prijzen van de aangeboden producten en/of diensten niet verhoogd, behoudens prijswijzigingen als gevolg van veranderingen in btw-tarieven.</li>
              <li>De in het aanbod genoemde prijzen zijn inclusief btw.</li>
              <li>Alle prijzen zijn onder voorbehoud van druk- en zetfouten. Voor de gevolgen van druk- en zetfouten wordt geen aansprakelijkheid aanvaard.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 8 - Levering en uitvoering</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>De ondernemer zal de grootst mogelijke zorgvuldigheid in acht nemen bij het in ontvangst nemen en bij de uitvoering van bestellingen van producten.</li>
              <li>Als plaats van levering geldt het adres dat de consument aan de ondernemer kenbaar heeft gemaakt.</li>
              <li>De ondernemer zal geaccepteerde bestellingen met bekwame spoed doch uiterlijk binnen 30 dagen uitvoeren.</li>
              <li>Indien de bezorging vertraging ondervindt, of indien een bestelling niet dan wel slechts gedeeltelijk kan worden uitgevoerd, ontvangt de consument hiervan uiterlijk 30 dagen nadat hij de bestelling geplaatst heeft bericht.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 9 - Betaling</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Voor zover niet anders is bepaald in de overeenkomst of aanvullende voorwaarden, dienen de door de consument verschuldigde bedragen te worden voldaan binnen 14 dagen na het ingaan van de bedenktermijn.</li>
              <li>De consument heeft de plicht om onjuistheden in verstrekte of vermelde betaalgegevens onverwijld aan de ondernemer te melden.</li>
              <li>Indien de consument niet tijdig aan zijn betalingsverplichting(en) voldoet, is deze, nadat hij door de ondernemer is gewezen op de te late betaling en de ondernemer de consument een termijn van 14 dagen heeft gegund om alsnog aan zijn betalingsverplichtingen te voldoen, na het uitblijven van betaling binnen deze 14-dagen-termijn, over het nog verschuldigde bedrag de wettelijke rente verschuldigd.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 10 - Garantie en conformiteit</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>De ondernemer staat er voor in dat de producten en/of diensten voldoen aan de overeenkomst, de in het aanbod vermelde specificaties, aan de redelijke eisen van deugdelijkheid en/of bruikbaarheid en de op de datum van de totstandkoming van de overeenkomst bestaande wettelijke bepalingen en/of overheidsvoorschriften.</li>
              <li>Een door de ondernemer, fabrikant of importeur verstrekte garantie doet niets af aan de wettelijke rechten en vorderingen die de consument op grond van de overeenkomst tegenover de ondernemer kan doen gelden.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Artikel 11 - Klachten</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>De ondernemer beschikt over een voldoende bekend gemaakte klachtenprocedure en behandelt de klacht overeenkomstig deze klachtenprocedure.</li>
              <li>Klachten over de uitvoering van de overeenkomst moeten binnen bekwame tijd nadat de consument de gebreken heeft geconstateerd, volledig en duidelijk omschreven worden ingediend bij de ondernemer.</li>
              <li>Bij de ondernemer ingediende klachten worden binnen een termijn van 14 dagen gerekend vanaf de datum van ontvangst beantwoord.</li>
              <li>Indien een klacht een voorzienbaar langere verwerkingstijd vraagt, wordt door de ondernemer binnen de termijn van 14 dagen geantwoord met een bericht van ontvangst en een indicatie wanneer de consument een meer uitvoerig antwoord kan verwachten.</li>
            </ul>
          </section>

          <section className="bg-purple-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Contact</h2>
            <p className="mb-4">
              Voor vragen over deze algemene voorwaarden kun je contact opnemen met:
            </p>
            <p><strong>Droomvriendjes</strong></p>
            <p>Email: info@droomvriendjes.nl</p>
            <p>KVK: 9921083</p>
            <p></p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VoorwaardenPage;