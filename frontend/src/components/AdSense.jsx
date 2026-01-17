import React, { useEffect } from 'react';

/**
 * Google AdSense Component
 * Verschillende ad formaten voor verschillende plekken
 */

// Horizontale banner (tussen secties)
export const AdBanner = ({ className = '' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`ad-container my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3408254396794902"
        data-ad-slot="auto"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
};

// In-feed advertentie (tussen producten)
export const AdInFeed = ({ className = '' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3408254396794902"
        data-ad-slot="auto"
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      />
    </div>
  );
};

// Vierkante/rechthoekige advertentie (sidebar)
export const AdSquare = ({ className = '' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3408254396794902"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

// In-article advertentie (tussen content)
export const AdInArticle = ({ className = '' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`ad-container my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-3408254396794902"
        data-ad-slot="auto"
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
    </div>
  );
};

// Multiplex advertentie (grid van advertenties)
export const AdMultiplex = ({ className = '' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`ad-container my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3408254396794902"
        data-ad-slot="auto"
        data-ad-format="autorelaxed"
      />
    </div>
  );
};

export default AdBanner;
