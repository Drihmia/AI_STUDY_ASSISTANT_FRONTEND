// Purpose: Header component for the application.
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({handleLanguageChange, language}) => {
  const [dist, setDist] = useState(window.location.pathname !== "/chat" ? "/chat" : "/");

  console.log('language in header', language);

  // Language Selector
  const languageSelector = [ { 'en': '🇬🇧 EN' }, { 'fr': '🇫🇷 FR' }, { 'ar': '🇲🇦 AR' } ];

  return (
    <header className="bg-white shadow-md w-full text-center py-4 flex justify-between items-center flex-col sm:flex-row sm:px-4">
      <div>
      <Link
        to={dist}
        href="/" // for accessibility
        rel={dist}
        role="button"
        replace
        className="text-3xl sm:text-3xl font-bold"
        onClick={() => setDist((prev) => prev = window.location.pathname === "/chat" ? "/chat" : "/") }
      >
        🌟 AI Study Assistant 🌟
      </Link>
      </div>
      {/* Language Selector */}
      <div className="sm:flex sm:justify-center sm:space-x-2 center items-center gap-2">
        { languageSelector.map((lang) => (
          <button onClick={() => handleLanguageChange(Object.keys(lang)[0])} className="px-1  sm:px-3 sm:py-1 bg-gray-200 rounded-md ml-3 text-sm sm:text-xl">{Object.values(lang)[0]}</button>
        ))}
      </div>
    </header>
  );
};

export default Header;
