import { React, useEffect, lazy, Suspense } from 'react';
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

  useEffect(() => {
    document.title = '🌟 AI Study Assistant 🌟';
  }, []);

  return (
      <div className="flex flex-col h-screen bg-gray-100">
        <Header />
        <GoogleTag />
        <GoogleTagManager />
        <ConsentBanner />
        <Router>
          <Suspense fallback={<LocationFallback />}>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Suspense>
        </Router>
        <Footer />
      </div>
  );
};
const LocationFallback = () => {
  const location = useLocation(); // Access location inside the fallback

  return <Loading location={location.pathname} />;
};

export default App;

