import React, { useState } from 'react';

function ToggleMenu( { children } ) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="transform scale-150">
      <button onClick={handleToggle} className="p-2 pb-3 text-2xl "> {isOpen ? '❌' : '🌐'} </button>
      {isOpen && (
        <div className="popup-menu">
          {children}
        </div>
      )}
    </div>
  );
}

export default ToggleMenu;

