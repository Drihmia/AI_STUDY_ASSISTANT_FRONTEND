import { React, useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
//import Chat from './components/Chat';
//import WelcomePage from './components/WelcomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import GoogleTag from './components/GoogleTag';
import GoogleTagManager from './components/GoogleTagManager';
import ConsentBanner from "./components/ConsentBanner";
import Loading from './components/Loading';


const WelcomePage = lazy(() => import('./components/WelcomePage'));
const Chat = lazy(() => import('./components/Chat'));
//const Loading = () => <div>Loading...</div>;


const App = () => {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");


  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    document.title = '🌟 AI Study Assistant 🌟';
  }, []);

  return (
      <div className="flex flex-col h-screen bg-gray-100">
        <Header handleLanguageChange={handleLanguageChange} language={language} />
        <GoogleTag />
        <GoogleTagManager />
        <ConsentBanner />
        <Router>
          <Suspense fallback={<LocationFallback />}>
            <Routes>
              <Route path="/" element={<WelcomePage language={language} />} />
              <Route path="/chat" element={<Chat language={language} />} />
            </Routes>
          </Suspense>
        </Router>
        <Footer language={language} />
      </div>
  );
};
const LocationFallback = () => {
  const location = useLocation(); // Access location inside the fallback

  return <Loading location={location.pathname} />;
};

export default App;

