import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const GoogleAdsCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Bezig met verwerken...');
  const hasExchanged = useRef(false); // Prevent double exchange

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setMessage(`Autorisatie geweigerd: ${error}`);
      return;
    }

    if (code && !hasExchanged.current) {
      hasExchanged.current = true; // Mark as exchanged
      exchangeCode(code);
    } else if (!code) {
      setStatus('error');
      setMessage('Geen autorisatiecode ontvangen');
    }
  }, [searchParams]);

  const exchangeCode = async (code) => {
    try {
      const currentOrigin = window.location.origin;
      const response = await fetch(`${API_URL}/api/google-ads/oauth-callback?code=${encodeURIComponent(code)}&origin=${encodeURIComponent(currentOrigin)}`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setMessage('Google Ads account succesvol verbonden!');
        
        setTimeout(() => {
          navigate('/admin/shopping-campaigns');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.detail || 'Er ging iets mis bij het verbinden');
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      setStatus('error');
      setMessage('Er ging iets mis bij het verbinden met Google Ads');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            {status === 'processing' && (
              <>
                <RefreshCw className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-spin" />
                <h2 className="text-xl font-semibold mb-2">Even geduld...</h2>
                <p className="text-gray-600">{message}</p>
              </>
            )}
            
            {status === 'success' && (
              <>
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-xl font-semibold mb-2 text-green-600">Gelukt!</h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <p className="text-sm text-gray-500">Je wordt doorgestuurd naar Shopping Campaigns...</p>
              </>
            )}
            
            {status === 'error' && (
              <>
                <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                <h2 className="text-xl font-semibold mb-2 text-red-600">Fout</h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <button
                  onClick={() => navigate('/admin/shopping-campaigns')}
                  className="text-purple-600 hover:underline"
                >
                  Terug naar Shopping Campaigns
                </button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default GoogleAdsCallbackPage;
