import React, { useState } from 'react';

function ToggleMenu( { children } ) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="scale-100">
      <button onClick={handleToggle} className="px-1 mt-1 text-4xl "> {isOpen ? '❌' : '🌐'} </button>
      {isOpen && (
        <div className="popup-menu">
          {children}
        </div>
      )}
    </div>
  );
}

export default ToggleMenu;

