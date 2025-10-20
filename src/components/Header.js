
import React, { useContext, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, GoogleOneTap } from "@clerk/clerk-react";

import { GlobalContext } from "../context/GlobalContext";
import { translations } from "../locales/translations_header_footer";
import ToggleMenu from "./ToggleMenu";

const Header = ({ buttons }) => {
  const { language, handleLanguageChange, serverStatus } = useContext(GlobalContext);
  const t = useMemo(() => translations[language || "fr"].header, [language]);

  const languageSelector = [ { 'en': '🇬🇧 EN' }, { 'fr': '🇫🇷 FR' }, { 'ar': '🇲🇦 AR' } ];

  return (
    <header className="bg-white shadow-md w-full text-center py-4 flex flex-col sm:flex-row justify-between items-center sm:px-1 md:px-4 backdrop-blur-lg rounded-lg">
      <div>
        <Link
          to={"/"}
          className={`text-3xl only-md:text-2xl only-sm:text-2xl font-bold hover:text-orange-500 transition-colors ${
            serverStatus === 'online' ? 'text-green-500' : ''
          }`}
        >
          { t.title }
        </Link>
      </div>

      <nav className="flex gap-0 mt-1  px-2 sm:px-0 sm:mt-0">
        {buttons.map((button, index) => (
            <Link key={index} to={button.to} className="px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition font-medium">
                {button.label}
            </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 mt-1 sm:mt-0">
        <ToggleMenu >
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
              px-4 py-2 text-sm sm:text-base font-semibold text-white rounded-lg shadow-md
              bg-gradient-to-r from-orange-400 to-orange-600
              hover:scale-105 hover:from-orange-500 hover:to-orange-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-5 xxs:h-3 sm:h-5 md:h-7"
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
          <UserButton mode="modal" />
        </SignedIn>
      </div>
    </header>
  );
};

export default memo(Header);
