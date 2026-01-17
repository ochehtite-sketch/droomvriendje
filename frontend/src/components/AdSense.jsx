import React, { useEffect, useRef, useState } from 'react';

/**
 * Google AdSense Component
 * Verschillende ad formaten voor verschillende plekken
 * 
 * NOTE: Ads worden alleen getoond op geverifieerde domeinen.
 * In development/preview mode worden placeholder divs getoond.
 */

const AD_CLIENT = "ca-pub-3408254396794902";

// Check if we're in production (droomvriendjes.nl domain)
const isProduction = () => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname.includes('droomvriendjes.nl') || hostname.includes('droomvriendje.nl');
};

// Placeholder component for development
const AdPlaceholder = ({ format = 'banner', className = '' }) => {
  if (isProduction()) return null;
  
  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm ${className}`}
         style={{ minHeight: format === 'banner' ? '90px' : format === 'square' ? '250px' : '120px' }}>
      <span>Advertentie (preview)</span>
    </div>
  );
};

// Horizontale banner (tussen secties)
export const AdBanner = ({ className = '' }) => {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isProduction()) return;
    
    try {
      if (adRef.current && !loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setLoaded(true);
      }
    } catch (e) {
      // Silently fail - ads will just not show
    }
  }, [loaded]);

  if (!isProduction()) {
    return <AdPlaceholder format="banner" className={`my-6 ${className}`} />;
  }

  return (
    <div className={`ad-container my-6 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot="auto"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
};

// In-feed advertentie (tussen producten)
export const AdInFeed = ({ className = '' }) => {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isProduction()) return;
    
    try {
      if (adRef.current && !loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setLoaded(true);
      }
    } catch (e) {
      // Silently fail
    }
  }, [loaded]);

  if (!isProduction()) {
    return <AdPlaceholder format="feed" className={className} />;
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot="auto"
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      />
    </div>
  );
};

// Vierkante/rechthoekige advertentie (sidebar)
export const AdSquare = ({ className = '' }) => {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isProduction()) return;
    
    try {
      if (adRef.current && !loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setLoaded(true);
      }
    } catch (e) {
      // Silently fail
    }
  }, [loaded]);

  if (!isProduction()) {
    return <AdPlaceholder format="square" className={className} />;
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

// In-article advertentie (tussen content)
export const AdInArticle = ({ className = '' }) => {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isProduction()) return;
    
    try {
      if (adRef.current && !loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setLoaded(true);
      }
    } catch (e) {
      // Silently fail
    }
  }, [loaded]);

  if (!isProduction()) {
    return <AdPlaceholder format="article" className={`my-8 ${className}`} />;
  }

  return (
    <div className={`ad-container my-8 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot="auto"
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
    </div>
  );
};

// Multiplex advertentie (grid van advertenties)
export const AdMultiplex = ({ className = '' }) => {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isProduction()) return;
    
    try {
      if (adRef.current && !loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setLoaded(true);
      }
    } catch (e) {
      // Silently fail
    }
  }, [loaded]);

  if (!isProduction()) {
    return <AdPlaceholder format="multiplex" className={`my-8 ${className}`} />;
  }

  return (
    <div className={`ad-container my-8 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot="auto"
        data-ad-format="autorelaxed"
      />
    </div>
  );
};

export default AdBanner;
