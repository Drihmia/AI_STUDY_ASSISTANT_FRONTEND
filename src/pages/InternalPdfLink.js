
import React from 'react';
import { Link } from 'react-router-dom';

const InternalPdfLink = ({ to, children }) => {
  return (
    <Link to={to} className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {children}
    </Link>
  );
};

export default InternalPdfLink;
