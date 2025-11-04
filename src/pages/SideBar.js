import React, { memo, useMemo } from 'react';
// import { FaHome, FaUser, FaCog, FaInfoCircle } from 'react-icons/fa';
import translations from '../locales/translations_resources.js';
import { categoryIcons } from './objects';

// --- Sidebar for Categories ---
const SideBar = memo(({ activeCategory, setActiveCategory, isSidebarExpanded, setIsSidebarExpanded, categories, language }) => {

  const t = useMemo(() => translations[language] || translations.fr, [language]);

  return (
    <aside className={`flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'w-64' : 'w-16'}`}>
      <nav className="flex-grow px-2 py-4">
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category} className="relative group">
              <button
                onClick={() => setActiveCategory(category)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 font-semibold ${activeCategory === category ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-orange-50'}`}>
                {categoryIcons[category]}
                <span className={`mx-4 transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>{t.categoryTranslations[category]}</span>
              </button>
              {!isSidebarExpanded && (
                <div className={`absolute top-1/2 -translate-y-1/2 ${language === 'ar' ? 'right-full mr-2' : 'left-full ml-2'} px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                  {t.categoryTranslations[category]}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-2 py-4 border-t border-gray-200">
        <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="w-full flex items-center justify-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${isSidebarExpanded ? (language === 'ar' ? 'rotate-180' : '') : (language === 'ar' ? '' : 'rotate-180') }`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      </div>
    </aside>
  );
});

export default SideBar;