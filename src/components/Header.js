
import React, { useState, useContext, useMemo, memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, GoogleOneTap } from "@clerk/clerk-react";

import { GlobalContext } from "../context/GlobalContext";
import { translations } from "../locales/translations_header_footer";
import ToggleMenu from "./ToggleMenu";

const Header = ({ buttons }) => {
  const { language, handleLanguageChange, serverStatus } = useContext(GlobalContext);
  const t = useMemo(() => translations[language || "fr"].header, [language]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const languageSelector = [ { 'en': '🇬🇧 EN' }, { 'fr': '🇫🇷 FR' }, { 'ar': '🇲🇦 AR' } ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md w-full py-4 px-4 flex items-center justify-between backdrop-blur-lg rounded-lg">
      {/* Small Screen Layout */}
      <div className="sm:hidden flex-1 flex justify-start items-center">
        {/* Hamburger Menu */}
        <div className="relative" ref={menuRef}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 focus:outline-none">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
          {isMenuOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <nav className="flex flex-col p-2">
                {buttons.map((button, index) => (
                    <Link key={index} to={button.to} className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition font-medium" onClick={() => setIsMenuOpen(false)}>
                        {button.label}
                    </Link>
                ))}
              </nav>
              <div className="border-t border-gray-200 p-2">
                {languageSelector.map((lang, index) => (
                  <button
                    key={index}
                    alt={Object.keys(lang)[0]}
                    onClick={() => {
                      handleLanguageChange(Object.keys(lang)[0]);
                      setIsMenuOpen(false);
                    }}
                    className={ `w-full text-left my-1 transition px-3 py-1 bg-gray-100 text-gray-800 hover:bg-orange-100 rounded-md text-sm ${language === Object.keys(lang)[0] ? "border-2 bg-orange-100 shadow-md" : ""}` }
                  >
                    {Object.values(lang)[0]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="sm:hidden flex-auto text-center">
        <Link
            to={"/"}
            className={`text-2xl font-bold hover:text-orange-500 transition-colors ${
            serverStatus === 'online' ? 'text-green-500' : ''
            }`}
        >
            { t.title }
        </Link>
      </div>
      <div className="sm:hidden flex-1 flex justify-end">
        <SignedIn>
            <div className="transform scale-125">
                <UserButton mode="modal" />
            </div>
        </SignedIn>
        <SignedOut>
            <SignInButton mode="modal" />
        </SignedOut>
      </div>


      {/* Large Screen Layout */}
      <div className="hidden sm:flex flex-1 justify-between items-center">
        <div className="flex items-center gap-4">
            <Link
              to={"/"}
              className={`text-2xl sm:text-3xl font-bold hover:text-orange-500 transition-colors ${
                serverStatus === 'online' ? 'text-green-500' : ''
              }`}
            >
              { t.title }
            </Link>
            <nav className="flex gap-0 px-2">
                {buttons.map((button, index) => (
                    <Link key={index} to={button.to} className="px-2 py-1 text-sm md:px-3 md:py-2 sm:text-xl lg:px-4 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition font-medium">
                        {button.label}
                    </Link>
                ))}
            </nav>
        </div>
        <div className="flex items-center gap-4">
            <ToggleMenu>
                <div className="absolute right top-full mt-2 transform -translate-x-1/2 opacity-100 hover:opacity-100 transition bg-gray-300 shadow-md backdrop-blur-lg text-white text-xs rounded-md py-1 px-2 whitespace-nowrap">
                    {languageSelector.map((lang, index) => (
                    <button
                        key={index}
                        alt={Object.keys(lang)[0]}
                        onClick={() => handleLanguageChange(Object.keys(lang)[0])}
                        className={ `mx-1 transition px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 hover:bg-orange-100 rounded-md text-sm sm:text-base ${language === Object.keys(lang)[0] ? "border-2 bg-orange-100 shadow-md" : ""}` }
                    >
                        {Object.values(lang)[0]}
                    </button>
                    ))}
                </div>
            </ToggleMenu>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="relative group flex items-center gap-2 transition-all duration-300
                  px-5 py-2.5 text-sm sm:text-base font-semibold text-white rounded-lg shadow-md
                  bg-gradient-to-r from-orange-400 to-orange-600
                  hover:scale-105 hover:from-orange-500 hover:to-orange-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>

                  <span className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {t.signInButton}
                  </span>
                </button>
              </SignInButton>
              <GoogleOneTap />
            </SignedOut>
            <SignedIn>
                <div className="transform scale-125">
                    <UserButton mode="modal" />
                </div>
            </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);

