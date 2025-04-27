// Purpose: Header component for the application.
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, GoogleOneTap } from "@clerk/clerk-react";
import { GlobalContext } from "../context/GlobalContext";


const Header = () => {
  const [dist, setDist] = useState(window.location.pathname !== "/chat" ? "/chat" : "/");
  const { language, handleLanguageChange } = useContext(GlobalContext);



  // Language Selector
  const languageSelector = [ { 'en': '🇬🇧 EN' }, { 'fr': '🇫🇷 FR' }, { 'ar': '🇲🇦 AR' } ];

  return (
    <header className="bg-white shadow-md w-full text-center py-4 flex flex-col sm:flex-row justify-between items-center px-4 backdrop-blur-lg rounded-lg">
      {/* Logo */}
      <div>
        <Link
          to={dist}
          className="text-3xl font-bold hover:text-orange-500 transition-colors"
          onClick={() =>
              setDist(() =>
                window.location.pathname === "/chat" ? "/" : "/chat"
              )
          }
        >
          🌟 AI Study Assistant 🌟
        </Link>
      </div>

      {/* Auth + Language Group */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0">

        {languageSelector.map((lang, index) => (
          <button
            key={index}
            onClick={() => handleLanguageChange(Object.keys(lang)[0])}
            className={ `transition px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 hover:bg-orange-100 rounded-md text-sm sm:text-base ${language === Object.keys(lang)[0] ? "border-2 bg-orange-100 shadow-md" : ""}` }
          >
            {Object.values(lang)[0]}
          </button>
        ))}


        <SignedOut>
          <SignInButton mode="modal">
            <button className="transition-all duration-300 px-4 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-md hover:scale-105 hover:from-orange-500 hover:to-orange-700">
              🔐 Sign In
            </button>
          </SignInButton>
        <GoogleOneTap />
        </SignedOut>
        <SignedIn>
          <UserButton mode="modal" />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
