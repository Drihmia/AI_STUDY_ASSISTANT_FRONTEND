
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import translations from "../locales/translations_welcome_page";
import { GlobalContext } from "../context/GlobalContext";

const WelcomePage = () => {
  // Get the language from context
  const { language } = useContext(GlobalContext);

  const direction = language === "ar" ? "rtl" : "ltr";
  const orientation = language === "ar" ? "pr-6 text-right" : "pl-6 text-left";

  // Get text based on selected language
  const t = translations[language || 'en'];

  document.title = t.title;

  return (
    <div dir={direction} className={`flex justify-center items-start bg-gray-100 p-4 ${orientation} overflow-y-auto`}>
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg">

        {/* Title */}
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-6" aria-label={t.title}>
          {t.title}
        </h1>

        {/* Introduction */}
        <p className="text-lg text-gray-700 text-center mb-6" aria-label={t.intro}>{t.intro}</p>

        {/* New Features Section */}
        <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h2 className={`text-xl font-bold text-orange-600 mb-3 flex items-center gap-2 ${direction === 'rtl' ? 'flex-row-reverse justify-end' : ''}`} aria-label={t.new_features_title}>
            {t.new_features_title}
          </h2>
          <ul className={`space-y-2 text-gray-800 ${orientation}`}>
            {t.new_feature_list.map((item, index) => (
              <li key={index} className={`flex items-start gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`} aria-label={item}>
                <span className="text-lg"></span> {/* Placeholder for potential icon in future if item doesn't have emoji */}
                 <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Core Features Section */}
        <h2 className={`text-xl font-semibold text-gray-800 mb-3 ${direction} ${orientation}`} aria-label={t.features}>{t.features}</h2>
        <ul className={`list-disc text-gray-700 space-y-2 ${orientation} ${language === 'ar' ? 'pr-5' : 'pl-5'}`}>
          {t.feature_list.map((item, index) => (
             <li key={index} className={`${direction} ${orientation}`} aria-label={item}>
               <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
             </li>
          ))}
        </ul>

        {/* Lessons */}
        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3" aria-label={t.lessons}>{t.lessons}</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600" aria-label={t.physics_tcs}>{t.physics_tcs}</h3>
            <ul className={`list-disc text-gray-700 ${orientation} ${language === 'ar' ? 'pr-5' : 'pl-5'}`}>
              { t.lessons_list.physics_tcs.map((item, index) => (
                <li key={index}  aria-label={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">{t.chemistry_tcs}</h3>
            <ul className={`list-disc text-gray-700 ${orientation} ${language === 'ar' ? 'pr-5' : 'pl-5'}`}>
              { t.lessons_list.chemistry_tcs.map((item, index) => (
                <li key={index} aria-label={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">{t.chemistry_bac}</h3>
            <ul className={`list-disc text-gray-700 ${orientation} ${language === 'ar' ? 'pr-5' : 'pl-5'}`}>
            { t.lessons_list.chemistry_bac.map((item, index) => (
              <li key={index} aria-label={item}>{item}</li>
            ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">{t.physics_bac}</h3>
            <ul className={`list-disc text-gray-700 ${orientation} ${language === 'ar' ? 'pr-5' : 'pl-5'}`}>
            { t.lessons_list.physics_bac.map((item, index) => (
              <li key={index} aria-label={item}>{item}</li>
            ))}
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <SignedIn>
            <Link
              to="/chat"
              href="/chat"
              rel="/"
              role="button"
              replace
              aria-label={t.ai_button}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-lg font-semibold shadow-md"
            >
              {t.ai_button}
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="transition-all duration-300 px-4 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md hover:scale-105 hover:from-blue-500 hover:to-blue-700">
                🔐 {t.sign_in}
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Pricing Section */}
        <div className="mt-12 text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">{t.pricing_title}</h2>
            <Link to="/pricing">
                <button className="mt-4 px-8 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                    {t.pricing_button}
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default WelcomePage;
