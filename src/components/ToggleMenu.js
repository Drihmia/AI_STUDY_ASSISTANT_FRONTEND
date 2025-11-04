
const ToggleMenu = ( { setIsLanguageOpen, isLanguageOpen, children } ) => {
  return (
    <div className="scale-100">
      <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="px-1 text-4xl "> {isLanguageOpen ? '❌' : '🌐'} </button>
      {isLanguageOpen && (
        <div className="popup-menu">
          {children}
        </div>
      )}
    </div>
  );
}

export default ToggleMenu;