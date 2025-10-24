import {useState, useEffect, useContext, useCallback } from 'react';
import { GlobalContext } from '../../context/GlobalContext';


const ChatInputFile = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const { file, setFile } = useContext(GlobalContext);

  useEffect(() => {
      // This effect now solely handles cleaning up the object URL 
      // when the message is sent (i.e., when `file` is cleared from global context).
      if (!file && selectedFile) {
        URL.revokeObjectURL(selectedFile);
        setSelectedFile(null);
      }
  }, [file, selectedFile]);


  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const formImageData = new FormData();
      formImageData.append('image', file);
      setFile(formImageData);
      
      // Revoke the old object URL before creating a new one to prevent memory leaks.
      setSelectedFile(prev => {
        if (prev) {
          URL.revokeObjectURL(prev);
        }
        return URL.createObjectURL(file);
      });

    }
  }, [setFile]);

  useEffect( () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileChange);
    return () => {
      fileInput.removeEventListener('change', handleFileChange);
    };
  }, [handleFileChange]);

  return (
    <>
      <input type="file" accept="image/*" id="fileInput" name="fileInput" className="hidden" />
      <label htmlFor="fileInput" className="cursor-pointer mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-500 hover:text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </label>
      {selectedFile && (
        <div className="text-sm text-gray-600">
          <button type="button" onClick={() =>window.open(selectedFile, '_blank', 'noopener,noreferrer')} className="text-red-500 hover:underline mb-1">
            <img type="button" src={selectedFile} alt="Selected" className="h-16 w-16 object-cover rounded-md" />
          </button>
        </div>
      )}
    </>
  );
};

export default ChatInputFile;
