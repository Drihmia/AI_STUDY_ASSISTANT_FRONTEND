
import React from 'react';

const ExternalLink = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {children}
    </a>
  );
};

export default ExternalLink;
