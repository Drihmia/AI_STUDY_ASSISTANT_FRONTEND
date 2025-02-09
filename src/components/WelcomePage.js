import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import translations from "../locales/translations";

const WelcomePage = () => {
  // Detect user's language (default to English)
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const [direction, setDirection] = useState(language === "ar" ? "rtl" : "ltr");
  const [orientation, setOrientation] = useState(language === "ar" ? "text-right" : "text-left");

  // Change direction based on selected language
  useEffect(() => {
    setDirection(language === "ar" ? "rtl" : "ltr");
    setOrientation(language === "ar" ? "pr-6 text-right" : "pl-6 text-left");
  }, [language]);

  // Get text based on selected language
  const t = translations[language];

  // Function to change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div dir={direction} className={`flex justify-center items-center bg-gray-100 p-4 ${orientation}`}>
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg">
        {/* Language Selector */}
        <div className="flex justify-end space-x-2 mb-4 center">
          <button onClick={() => changeLanguage("en")} className="px-3 py-1 bg-gray-200 rounded-md">🇬🇧 EN</button>
          <button onClick={() => changeLanguage("fr")} className="px-3 py-1 bg-gray-200 rounded-md">🇫🇷 FR</button>
          <button onClick={() => changeLanguage("ar")} className="px-3 py-1 bg-gray-200 rounded-md">🇲🇦  AR</button>
        </div>

        {/* Title */}
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-6">
          {t.title}
        </h1>

        {/* Introduction */}
        <p className="text-lg text-gray-700 text-center mb-6">{t.intro}</p>

        {/* Features */}
        <h2 className={`text-xl font-semibold text-gray-800 mb-3 ${direction} ${orientation}`}>{t.features}</h2>
        <ul className={`list-disc text-gray-700 ${orientation}`}>

          {t.feature_list.map((item, index) => (
            <li key={index} direction orientation>{item}</li>
          ))}
        </ul>

        {/* Lessons */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.lessons}</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600">{t.chemistry_tcs}</h3>
            <ul className={`list-disc text-gray-700 ${orientation}`}>
              { t.lessons_list.chemistry_tcs.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">{t.chemistry_bac}</h3>
            <ul className={`list-disc text-gray-700 ${orientation}`}>
            { t.lessons_list.chemistry_bac.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">{t.physics_bac}</h3>
            <ul className={`list-disc text-gray-700 ${orientation}`}>
            { t.lessons_list.physics_bac.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/chat"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-lg font-semibold shadow-md"
          >
            {t.ai_button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

