
import { React, lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'
import { frFR, arSA, enUS } from "@clerk/localizations";


import { GlobalContext } from './context/GlobalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

const GoogleTagManager = lazy(() => import('./components/GoogleTagManager'));
const ConsentBanner = lazy(() => import("./components/ConsentBanner"));


const WelcomePage = lazy(() => import('./components/WelcomePage'));
const Chat = lazy(() => import('./components/Chat'));
const FeedbackPage = lazy(() => import('./components/FeedbackPage'));
const ContactTeacher = lazy(() => import('./components/ContactTeacher'));
const ResourcesPage = lazy(() => import('./components/ResourcesPage'));

const localizationMap = {
  en: enUS,
  fr: frFR,
  ar: arSA,
};

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const App = ({ publishableKey }) => {
  //console.log("localStorage.getItem('lang'):", localStorage.getItem("lang"));
  //console.log("navigator.language:", navigator.language.split("-")[0]);

  const [language, setLanguage] = useState(localStorage.getItem("lang") || navigator.language.split("-")[0] || "fr");
  const [serverStatus, setServerStatus] = useState('starting'); // 'starting', 'online', 'offline'
  const [file, setFile] = useState(null);

  //useEffect(() => {
    //console.log("file changed in App.js:", file);
  //}
    //, [file]);


  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        const response = await fetch(`${BACK_END_URL}/api/test/ok`);
        //console.table(response);
        if (response.ok) {
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (error) {
        setServerStatus('offline');
      }
    };

    wakeUpServer();
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const headerButtons = [
    { to: "/feedback", label: "Feedback" },
    { to: "/contact", label: "Contact" },
    { to: "/chat", label: "Chat" },
    { to: "/resources", label: "Resources" }
  ];

  return (
    <GlobalContext.Provider value={{ language, handleLanguageChange, serverStatus, setServerStatus, file, setFile }}>
      <ClerkProvider publishableKey={publishableKey}
        afterSignOutUrl="/"
        signInFallbackRedirectUrl="/chat"
        signUpFallbackRedirectUrl="/chat"
        localization={localizationMap[language] || localizationMap.fr}
      >
        <div className="flex flex-col h-screen bg-gray-100">
          <Suspense fallback={null}>
            <GoogleTagManager />
            <ConsentBanner />
          </Suspense>
          <Router>
            <Header buttons={headerButtons} />
            <Suspense fallback={<LocationFallback />}>
              <Routes>
                <Route path="/" element={<WelcomePage  />} />
                <Route path="/chat" element={<Chat language={language}/>} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/contact" element={<ContactTeacher />} />
                <Route path="/resources" element={<ResourcesPage />} />
              </Routes>
            </Suspense>
          </Router>
          <Footer/>
        </div>
      </ClerkProvider>

    </GlobalContext.Provider>
  );
};
const LocationFallback = () => {
  const location = useLocation(); // Access location inside the fallback

  return <Loading location={location.pathname} />;
};

export default App;
