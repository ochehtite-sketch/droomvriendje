import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component - Herbruikbare footer voor alle pagina's
 * Consistent Warm Brown Theme
 */
const Footer = () => {
  return (
    <footer className="bg-warm-brown-900 text-warm-brown-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-warm-brown-800">
          {/* Bedrijfsgegevens */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Droomvriendjes</h3>
            <p className="text-sm leading-relaxed opacity-70">
              Wij helpen kinderen en ouders aan een betere nachtrust door middel van innovatieve slaapknuffels.
            </p>
            <div className="text-sm opacity-70 space-y-1">
              <p>Schaesbergerweg 103</p>
              <p>6415 AD Heerlen</p>
              <p className="italic text-xs">(Dit is geen bezoekadres)</p>
              <p className="mt-2">KVK: 99210835</p>
              <p>BTW: NL204392123B01</p>
              <p>E-mail: info@droomvriendjes.nl</p>
            </div>
            <div className="pt-4 border-t border-warm-brown-800">
              <p className="font-semibold text-white text-sm mb-2">Retouradres:</p>
              <p className="text-sm opacity-70">Centerpoort-Nieuwgraaf</p>
              <p className="text-sm opacity-70">Geograaf 16</p>
              <p className="text-sm opacity-70">6921 EW Duiven</p>
            </div>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-10 h-10 bg-warm-brown-800 rounded-full flex items-center justify-center hover:bg-warm-brown-500 transition">
                <span className="text-sm">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-warm-brown-800 rounded-full flex items-center justify-center hover:bg-warm-brown-500 transition">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-warm-brown-800 rounded-full flex items-center justify-center hover:bg-warm-brown-500 transition">
                <span className="text-sm">🎵</span>
              </a>
            </div>
          </div>

          {/* Producten */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Producten</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li><Link to="/knuffels" className="hover:text-warm-brown-400 transition">Alle Knuffels</Link></li>
              <li><Link to="/knuffels" className="hover:text-warm-brown-400 transition">Voordeelbundels</Link></li>
              <li><Link to="/cadeaubon" className="hover:text-warm-brown-400 transition">Cadeaubonnen</Link></li>
              <li><Link to="/knuffels" className="hover:text-warm-brown-400 transition">Nieuw Binnen</Link></li>
            </ul>
          </div>

          {/* Klantenservice */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Klantenservice</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li><Link to="/#faq" className="hover:text-warm-brown-400 transition">Veelgestelde Vragen</Link></li>
              <li><Link to="/retourneren" className="hover:text-warm-brown-400 transition">Verzending & Levertijd</Link></li>
              <li><Link to="/retourneren" className="hover:text-warm-brown-400 transition">Retouren</Link></li>
              <li><Link to="/contact" className="hover:text-warm-brown-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Betaalmethoden */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Betaalmethoden</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 h-8 rounded flex items-center justify-center px-2 text-[10px] font-bold">iDEAL</div>
              <div className="bg-white/10 h-8 rounded flex items-center justify-center px-2 text-[10px] font-bold">KLARNA</div>
              <div className="bg-white/10 h-8 rounded flex items-center justify-center px-2 text-[10px] font-bold">PAYPAL</div>
              <div className="bg-white/10 h-8 rounded flex items-center justify-center px-2 text-[10px] font-bold">VISA</div>
              <div className="bg-white/10 h-8 rounded flex items-center justify-center px-2 text-[10px] font-bold">MC</div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest gap-4">
          <p>© 2024 Droomvriendjes. Alle rechten voorbehouden.</p>
          <div className="flex space-x-6">
            <Link to="/voorwaarden" className="hover:text-white transition">Voorwaarden</Link>
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/contact" className="hover:text-white transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
