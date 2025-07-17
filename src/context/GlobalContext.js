import { createContext } from 'react';

export const GlobalContext = createContext(null);


export default function GlobalContextProviderLayout({ children, language, handleLanguageChange }) {

  return (
    <GlobalContext.Provider value={{ language, handleLanguageChange }}>
      {children}
    </GlobalContext.Provider>
  );
}

