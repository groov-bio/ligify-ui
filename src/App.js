import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CookieConsent, { Cookies, getCookieConsentValue } from 'react-cookie-consent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Home from './Components/HomePage/Home.js';
import NavigationBar from './Components/NavigationBar.js';
import BrowsePage from './Components/BrowsePage.js'
import RegulatorPage from './Components/RegulatorPage/RegulatorPage.js'
import About from './Components/AboutPage/About.js';
import DBLoader from './stores/DBLoader.js';

import './css/App.css';

const queryClient = new QueryClient();

const GA_TRACKING_ID = 'G-NRFVY69VS2';

function loadGoogleAnalytics() {
  if (window.gaLoaded) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID);
  window.gaLoaded = true;
}

export default function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showBanner, setShowBanner] = useState(
    getCookieConsentValue('ligify-cookie-consent') === undefined
  );

  useEffect(() => {
    if (getCookieConsentValue('ligify-cookie-consent') === 'true') {
      loadGoogleAnalytics();
    }
  }, []);

  const handleCloseBanner = () => {
    Cookies.set('ligify-cookie-consent', 'false', { expires: 365 });
    setShowBanner(false);
  };

  <DBLoader/>
  
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows={isSmallScreen ? `56px` : `64px`}
      gridAutoRows="auto"
      sx={{ height: '100vh' }}
    >
      <Box gridColumn="span 12">
        <NavigationBar />
      </Box>
      <Box gridColumn="span 12">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/database" element={<BrowsePage />} />
          <Route path="/database/:refseq" element={<RegulatorPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
      {showBanner && (
        <CookieConsent
          location="bottom"
          cookieName="ligify-cookie-consent"
          enableDeclineButton
          onAccept={loadGoogleAnalytics}
          onDecline={() => setShowBanner(false)}
          buttonText="Accept"
          declineButtonText="Decline"
          style={{
            background: 'black',
            padding: '16px 40px',
            alignItems: 'center',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            justifyContent: 'center',
            gap: '20px',
          }}
          contentStyle={{
            flex: '0 1 auto',
            margin: '8px 20px 8px 0',
          }}
          buttonStyle={{
            background: '#fffa91',
            color: 'black',
            fontSize: '14px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 500,
            borderRadius: '4px',
            padding: '10px 28px',
            margin: '0 8px',
            border: 'none',
            cursor: 'pointer',
          }}
          declineButtonStyle={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.4)',
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 300,
            borderRadius: '4px',
            padding: '10px 28px',
            margin: '0 8px',
            cursor: 'pointer',
          }}
        >
          We use cookies to analyze site traffic.
          <IconButton
            onClick={handleCloseBanner}
            size="small"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'rgba(255,255,255,0.6)',
              '&:hover': { color: 'white' },
            }}
            aria-label="close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </CookieConsent>
      )}
    </Box>
    </BrowserRouter>
    </QueryClientProvider>
  )
}
