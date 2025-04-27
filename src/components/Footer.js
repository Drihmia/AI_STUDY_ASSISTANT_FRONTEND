import React from 'react';
//import { useContext } from 'react';
//import { GlobalContext } from '../context/GlobalContext';

const Footer = () => {
  //const { language } = useContext(GlobalContext);
  return (
    <footer className="bg-white text-center py-4 backdrop-blur-md shadow-lg rounded-lg w-full">
      <p className="text-sm text-gray-600">
        Powered by DRIHMIA AI | Your Personal Study Assistant
      </p>
    </footer>
  );
};

export default Footer;
