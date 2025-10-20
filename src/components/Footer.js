import React, { useMemo, useContext, memo } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { translations } from "../locales/translations_header_footer"; // Import translations


const Footer = () => {
  const { language } = useContext(GlobalContext);
  const t = useMemo(() => translations[language || "fr"].footer, [language]);

  return (
    <footer className="bg-white text-center py-4 backdrop-blur-md shadow-lg rounded-lg w-full">
      <p className="text-sm text-gray-600">
        <a href="https://www.linkedin.com/in/rdrihmia/" target="_" className="text-gray-600 hover:underline  hover:text-orange-700 ">{t.poweredBy} </a>
      </p>
    </footer>
  );
};

export default memo(Footer);
