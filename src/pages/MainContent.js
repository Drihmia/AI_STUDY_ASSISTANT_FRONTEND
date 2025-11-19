import React, { memo, useMemo } from 'react';
import translations from '../locales/translations_resources.js';
import { SignedIn, SignedOut } from "@clerk/clerk-react";


// --- Main Content Area ---
const MainContent = memo(({ activeLevel, setActiveLevel, levels, displayedResources, language }) => {

  const t = useMemo(() => translations[language] || translations.fr, [language]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">{t.pageTitle}</h1>
        {/* Level Selection Tabs */}
        <Banner
          activeLevel={activeLevel}
          setActiveLevel={setActiveLevel}
          levels={levels}
          language={language}
        />
      </header>
      {/* --- Resource Cards Grid --- */}
      <ResourcesCards
        displayedResources={displayedResources}
        language={language}
      />
        {/* Beta Notice */}
        <BetaNotice language={language} />
    </div>
  );
});

// --- Upper Banner with Title and Level Selection ---
const Banner = memo(({ activeLevel, setActiveLevel, levels, language }) => {
  return (
    <div className="flex justify-center mt-4 bg-gray-100 rounded-lg p-2 shadow-inner">
      {levels.map(level => (
        <button
          key={level}
          onClick={() => setActiveLevel(level)}
          className={`px-4 py-2 text-lg font-semibold rounded-md transition-colors duration-300 ${activeLevel === level ? 'bg-orange-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          {level}
        </button>
      ))}
    </div>
  );
});



// --- Resources Cards ---
const ResourcesCards = memo(({ displayedResources, language }) => {
  const t = useMemo(() => translations[language] || translations.fr, [language]);
  return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {displayedResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {displayedResources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} t={t} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md p-8">
              <p className="text-lg text-gray-500">{t.noResources}</p>
            </div>
          )}
        </main>
  );
});

// --- Beta Notice Component ---
const BetaNotice = memo(({ language }) => {
  const t = useMemo(() => translations[language] || translations.fr, [language]);
  return (
    <div className={`mt-6 text-center bg-orange-100 ${language === 'ar' ? 'border-r-4' : 'border-l-4'} border-orange-500 text-orange-700 px-4 py-3 rounded-r-lg`} role="alert">
      <div className="flex items-center justify-center">
        <div className="py-1">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
          <p className="font-bold">{t.betaTitle}</p>
          <p className="text-sm">{t.betaMessage}</p>
        </div>
      </div>
    </div> );
});

const ResourceCard = ({ resource, t }) => (
    <>
        <SignedIn>
            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3  dir='ltr' className="text-lg font-bold text-orange-600">{resource.title}</h3>
                <p  dir='ltr' className="text-gray-700 mt-1">{resource.description}</p>
                <p className="text-sm text-gray-500 mt-2">{t.authoredBy}: {resource.author}</p>
            </a>
        </SignedIn>
        <SignedOut>
            <div className="block p-4 bg-gray-100 rounded-lg shadow-inner cursor-not-allowed">
                <h3  dir='ltr' className="text-lg font-bold text-gray-500">{resource.title}</h3>
                <p  dir='ltr' className="text-gray-500 mt-1">{resource.description}</p>
                <p className="text-sm text-gray-400 mt-2">{t.authoredBy}: {resource.author}</p>
                <p className="text-sm font-semibold text-red-500 mt-3">{t.signInToView}</p>
            </div>
        </SignedOut>
    </>
);


export default MainContent;
