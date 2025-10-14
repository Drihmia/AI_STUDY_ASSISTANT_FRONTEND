import React, { useState } from 'react';

function ToggleMenu( { children } ) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}> {isOpen ? '❌' : '🌐'} </button>
      {isOpen && (
        <div className="popup-menu">
          {children}
        </div>
      )}
    </div>
  );
}

export default ToggleMenu;
