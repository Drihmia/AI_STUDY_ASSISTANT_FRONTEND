import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react'
//import { jwtDecode } from 'jwt-decode';

import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import Helmet from './Helmet';

// Import your Publishable Key
const PUBLISHABLE_KEY =  process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY
//console.log(`Clerk Publishable Key: ${PUBLISHABLE_KEY}`)

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


// Accessing cookies for user id for clerk in __session
// This is a workaround for Clerk's cookie-based authentication
// and is not recommended for production use.
//const cookies = Object.fromEntries(
  //document.cookie.split('; ').map(c => c.split('='))
//);

//console.log("Cookies:", cookies);
//console.log("Session:", cookies['__session']);
//const token = cookies['__session'];
//if (token) {
  //const decoded = jwtDecode(token);
  //console.log("Decoded Session Info:", decoded);
//}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      signInFallbackRedirectUrl="/chat"
      signUpFallbackRedirectUrl="/chat"
    >
    <Helmet />
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

//if ('serviceWorker' in navigator) {
  //window.addEventListener('load', () => {
    //navigator.serviceWorker.register('/serviceWorker.js')
      //.then((registration) => {
        //console.log('Service Worker registered:', registration);
      //})
      //.catch((error) => {
        //console.error('Service Worker registration failed:', error);
      //});
  //});
//}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
