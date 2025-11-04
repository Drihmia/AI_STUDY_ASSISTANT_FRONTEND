import React, { useState, useMemo, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

// --- Internationalization (i18n) Data ---
const translations = {
  en: {
    pageTitle: 'Study Resources',
    categoriesTitle: 'Categories',
    betaTitle: 'This Section is in Beta',
    betaMessage: "We're actively adding new lessons and exercises. Stay tuned for more content!",
    noResources: 'No resources found in this category.',
    authoredBy: 'Authored by',
    categoryTranslations: {
      lessons: 'Lessons',
      exercises: 'Exercises',
      experiences: 'Experiences',
      more: 'More',
    },
  },
  fr: {
    pageTitle: 'Ressources Pédagogiques',
    categoriesTitle: 'Catégories',
    betaTitle: 'Section en version Bêta',
    betaMessage: "Nous ajoutons activement de nouvelles leçons et exercices. Restez à l'écoute !",
    noResources: 'Aucune ressource trouvée dans cette catégorie.',
    authoredBy: 'Auteur',
    categoryTranslations: {
      lessons: 'Leçons',
      exercises: 'Exercices',
      experiences: 'Expériences',
      more: 'Plus',
    },
  },
  ar: {
    pageTitle: 'مصادر دراسية',
    categoriesTitle: 'الفئات',
    betaTitle: 'هذا القسم في المرحلة التجريبية',
    betaMessage: 'نحن نضيف بنشاط دروسًا وتمارين جديدة. ترقبوا المزيد من المحتوى!',
    noResources: 'لم يتم العثور على موارد في هذه الفئة.',
    authoredBy: 'المؤلف',
    categoryTranslations: {
      lessons: 'دروس',
      exercises: 'تمارين',
      experiences: 'تجارب',
      more: 'المزيد',
    },
  },
};


// --- Data Structure for Resources ---
const resourcesData = {
  'TC': {
    lessons: [
      { title: 'Introduction to Chemistry', description: 'A comprehensive overview of basic chemistry principles.', author: 'Prof. Ahmed', link: '#' },
      { title: 'Physics Fundamentals', description: 'Exploring the core concepts of motion and energy.', author: 'Mme. Fatima', link: '#' },
    ],
    exercises: [
      { title: 'Chemistry Practice Problems', description: 'A set of problems to test your knowledge.', author: 'Prof. Ahmed', link: '#' },
    ],
    experiences: [],
    more: [
        { title: 'Video: The World of Atoms', description: 'A short documentary on atomic structures.', author: 'Science Channel', link: '#' },
    ],
  },
  '1BAC': {
    lessons: [
        { title: 'Advanced Organic Chemistry', description: 'Delving into complex carbon compounds.', author: 'Prof. Youssef', link: '#' },
    ],
    exercises: [],
    experiences: [
        { title: 'Lab Simulation: Titration', description: 'An interactive lab to practice titration techniques.', author: 'ChemSims', link: '#' },
    ],
    more: [],
  },
  '2BAC': {
    lessons: [],
    exercises: [],
    experiences: [],
    more: [],
  },
};

// --- SVG Icons for Categories ---
const categoryIcons = {
    lessons: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>,
    exercises: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>,
    experiences: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    more: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
};

const ResourceCard = ({ resource, authoredByText }) => (
  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-lg font-bold text-orange-600">{resource.title}</h3>
    <p className="text-gray-700 mt-1">{resource.description}</p>
    <p className="text-sm text-gray-500 mt-2">{authoredByText}: {resource.author}</p>
  </a>
);

const Resources = () => {
  const { language } = useContext(GlobalContext);
  const t = useMemo(() => translations[language] || translations.en, [language]);

  const [activeLevel, setActiveLevel] = useState('TC');
  const [activeCategory, setActiveCategory] = useState('lessons');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const levels = ['TC', '1BAC', '2BAC'];
  const categories = ['lessons', 'exercises', 'experiences', 'more'];

  const displayedResources = useMemo(() => {
    return resourcesData[activeLevel][activeCategory] || [];
  }, [activeLevel, activeCategory]);

  return (
    <div className="flex h-full landscape:short:h-auto bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* --- Sidebar Navigation -- */}
      <aside className={`flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'w-64' : 'w-20'}`}>
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

      {/* --- Main Content Area -- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">{t.pageTitle}</h1>
            {/* Level Selection Tabs */}
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
            {/* Beta Notice */}
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
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {displayedResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {displayedResources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} authoredByText={t.authoredBy} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md p-8">
              <p className="text-lg text-gray-500">{t.noResources}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Resources;
