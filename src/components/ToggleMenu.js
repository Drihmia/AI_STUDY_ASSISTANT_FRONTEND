
const ToggleMenu = ( { setIsLanguageOpen, isLanguageOpen, children } ) => {
  return (
    <div className="scale-100">
      <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className={`pb-2 px-1 text-4xl ${isLanguageOpen ? '' : 'hover:scale-110'}`}> {isLanguageOpen ? '❌' : '🌐'} </button>
      {isLanguageOpen && (
        <div className="popup-menu">
          {children}
        </div>
      )}
    </div>
  );
}

export default ToggleMenu;