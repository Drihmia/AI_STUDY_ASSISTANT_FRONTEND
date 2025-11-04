import React, { useState, useMemo, useContext, memo } from 'react';
import { GlobalContext } from '../context/GlobalContext';


import SideBar from './SideBar';
import MainContent from './MainContent';
import { resourcesData } from './objects';


const Resources = () => {
  const { language } = useContext(GlobalContext);

  const [activeLevel, setActiveLevel] = useState('2BAC');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const levels = useMemo(() => ['TC', '1BAC', '2BAC'], []);
  const categories = useMemo(() =>['all', 'lessons', 'exercises', 'experiences', 'more'], []);

  const displayedResources = useMemo(() => {
    return ((activeCategory === 'all') ?
      Object.values(resourcesData[activeLevel]).flat() :
      resourcesData[activeLevel][activeCategory]);
  }, [activeLevel, activeCategory]);

  return (
    <div className="flex h-full landscape:short:h-auto bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* --- Sidebar Navigation -- */}
      <SideBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        categories={categories}
        language={language}
      />
      {/* --- Main Content Area -- */}
      <MainContent
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
        levels={levels}
        displayedResources={displayedResources}
        language={language}
      />
    </div>
  );
};


export default memo(Resources);