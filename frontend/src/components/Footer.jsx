import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component - Herbruikbare footer voor alle pagina's
 */
const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Bedrijfsgegevens */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🧸</span>
              <span className="text-2xl font-bold">Droomvriendjes</span>
            </div>
            <div className="text-purple-200 text-sm space-y-1">
              <p className="font-semibold text-white mb-2">Bedrijfsgegevens</p>
              <p>Droomvriendjes</p>
              <p>Schaesbergerweg 103</p>
              <p>6415 AD Heerlen</p>
              <p className="text-xs italic">(Dit is geen bezoekadres)</p>
              <p className="mt-3">KVK: 9921083</p>
              
              <div className="mt-4 pt-4 border-t border-purple-700">
                <p className="font-semibold text-white mb-1">Retouradres:</p>
                <p>Centerpoort-Nieuwgraaf</p>
                <p>Geograaf 16</p>
                <p>6921 EW Duiven</p>
              </div>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Navigatie</h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li><Link to="/#producten" className="hover:text-white transition-colors">Onze Kalmerende Knuffels</Link></li>
              <li><Link to="/#producten" className="hover:text-white transition-colors">Alle producten</Link></li>
              <li><Link to="/ouders-slaaptips" className="hover:text-white transition-colors">Ouders slaaptips</Link></li>
              <li><Link to="/over-ons" className="hover:text-white transition-colors">Over Droomvriendjes</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link to="/cadeaubon" className="hover:text-white transition-colors">Cadeaubon</Link></li>
              <li><Link to="/uitproberen" className="hover:text-white transition-colors">14 dagen gratis uitproberen</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Beoordelingen</Link></li>
              <li><Link to="/naam-bedenker" className="hover:text-white transition-colors">Droomvriendjes naam bedenker</Link></li>
              <li><Link to="/vrouwen-60" className="hover:text-white transition-colors">Vrouwen 60+</Link></li>
              <li><Link to="/ouders-baby" className="hover:text-white transition-colors">Ouders van baby's</Link></li>
              <li><Link to="/ouders-peuters" className="hover:text-white transition-colors">Ouders van peuters</Link></li>
              <li><Link to="/ouders-extra-behoeften" className="hover:text-white transition-colors">Extra behoeften</Link></li>
            </ul>
          </div>

          {/* Droomvriendjes helpt bij */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Droomvriendjes helpt bij</h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li><Link to="/stress" className="hover:text-white transition-colors">Stressvermindering</Link></li>
              <li><Link to="/overprikkeling" className="hover:text-white transition-colors">Prikkelverwerking</Link></li>
              <li><Link to="/angst" className="hover:text-white transition-colors">Angstvermindering</Link></li>
              <li><Link to="/slaapproblemen" className="hover:text-white transition-colors">Beter slapen</Link></li>
              <li><Link to="/troost" className="hover:text-white transition-colors">Troost vinden</Link></li>
              <li><Link to="/hsp" className="hover:text-white transition-colors">Hoogsensitiviteit</Link></li>
              <li><Link to="/dementie" className="hover:text-white transition-colors">Dementie</Link></li>
            </ul>
          </div>

          {/* Klantenservice */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Klantenservice</h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li><Link to="/#producten" className="hover:text-white transition-colors">Zoeken</Link></li>
              <li><Link to="/retourneren" className="hover:text-white transition-colors">Retourneren</Link></li>
              <li><Link to="/voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Beleid</Link></li>
              <li><Link to="/#faq" className="hover:text-white transition-colors">Veelgestelde Vragen</Link></li>
              <li><Link to="/#producten" className="hover:text-white transition-colors">Verzending</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <div className="mt-6">
              <p className="font-semibold text-white mb-2 text-sm">Betaalmethoden</p>
              <div className="text-purple-200 text-sm">
                <p>iDEAL • Klarna</p>
                <p>PayPal • Creditcard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-purple-800 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-purple-200 text-sm">&copy; 2025 Droomvriendjes. Alle rechten voorbehouden.</p>
            <div className="flex items-center space-x-4 text-purple-200 text-sm">
              <Link to="/voorwaarden" className="hover:text-white transition-colors">Voorwaarden</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
