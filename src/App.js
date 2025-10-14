import { React, lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'
import { frFR, arSA, enUS } from "@clerk/localizations";


//import Chat from './components/Chat';
//import WelcomePage from './components/WelcomePage';
import GlobalContextProviderLayout from './context/GlobalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

import GoogleTagManager from './components/GoogleTagManager';
import ConsentBanner from "./components/ConsentBanner";


const WelcomePage = lazy(() => import('./components/WelcomePage'));
const Chat = lazy(() => import('./components/Chat'));
const FeedbackPage = lazy(() => import('./components/FeedbackPage'));
const ContactTeacher = lazy(() => import('./components/ContactTeacher'));

const localizationMap = {
  en: enUS,
  fr: frFR,
  ar: arSA,
};

const App = ({ publishableKey }) => {
  console.log("localStorage.getItem('lang'):", localStorage.getItem("lang"));
  console.log("navigator.language:", navigator.language.split("-")[0]);
  const [language, setLanguage] = useState(localStorage.getItem("lang") || navigator.language.split("-")[0] || "fr");

/*  // Enable PWA*/
  /*const [deferredPrompt, setDeferredPrompt] = useState(null);*/
  /*const [showInstallBanner, setShowInstallBanner] = useState(localStorage.getItem("installBanner") || false);*/

  /*useEffect(() => {*/
    /*const handleBeforeInstallPrompt = (event) => {*/
      /*event.preventDefault();*/
      /*console.log("beforeinstallprompt fired");*/
      /*setDeferredPrompt(event);*/
      /*setShowInstallBanner(true);*/
    /*};*/

    /*window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);*/

    /*return () => {*/
      /*window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);*/
    /*};*/
  /*}, []);*/

  /*const handleInstallClick = () => {*/
    /*console.log('inside install click');*/
    /*if (deferredPrompt) {*/
      /*console.log('installing app');*/
      /*deferredPrompt.prompt();*/
      /*deferredPrompt.userChoice.then((choiceResult) => {*/
        /*if (choiceResult.outcome === 'accepted') {*/
          /*console.log('User installed the app');*/
        /*} else {*/
          /*console.log('User dismissed the prompt');*/
        /*}*/
        /*setDeferredPrompt(null);*/
        /*setShowInstallBanner(false);*/
        /*localStorage.setItem("installBanner", true);*/
      /*});*/
    /*}*/
  /*};*/

  /*const handleIgnoreClick = () => {*/
    /*setShowInstallBanner(false);*/
    /*localStorage.setItem("installBanner", true);*/
  /*}*/

        //{showInstallBanner && (
          //<div className="fixed bottom-0 left-0 w-full bg-green-500 text-white p-4 text-center shadow-lg">
            //<p className="inline-block mr-4">Install our app for a better experience!</p>
            //<div className="inline-block flex space-x-4 items-center">
              //<button
                //onClick={handleInstallClick}
                //className="bg-white text-green-600 px-4 py-2 rounded shadow hover:bg-gray-200 transition mr-4"
              //>
                //Install
              //</button>
              //<button
                //onClick={handleIgnoreClick}
              //className="bg-white text-red-600 px-4 py-2 rounded shadow hover:bg-gray-200 transition"
            //>
              //Ignore
            //</button>
            //</div>
          //</div>
        //)}

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <GlobalContextProviderLayout language={language} handleLanguageChange={handleLanguageChange}>
      <ClerkProvider publishableKey={publishableKey}
        afterSignOutUrl="/"
        signInFallbackRedirectUrl="/chat"
        signUpFallbackRedirectUrl="/chat"
        localization={localizationMap[language] || localizationMap.fr}
      >
        <div className="flex flex-col h-screen bg-gray-100">
          <GoogleTagManager />
          <ConsentBanner />
          <Router>
            <Header />
            <Suspense fallback={<LocationFallback />}>
              <Routes>
                <Route path="/" element={<WelcomePage  />} />
                <Route path="/chat" element={<Chat language={language} />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/contact" element={<ContactTeacher />} />
              </Routes>
            </Suspense>
          </Router>
          <Footer/>
        </div>
      </ClerkProvider>

    </GlobalContextProviderLayout>
  );
};
const LocationFallback = () => {
  const location = useLocation(); // Access location inside the fallback

  return <Loading location={location.pathname} />;
};

export default App;

