import { useState, useEffect, useContext, useCallback } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useUser } from '@clerk/clerk-react';

const ChatInputFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { file, setFile } = useContext(GlobalContext);
  const { user } = useUser();

  const [tooltipText, setTooltipText] = useState('');
  const [isUploadDisabled, setIsUploadDisabled] = useState(false);

  const getUploadCount = useCallback(() => {
    const today = new Date().toLocaleDateString();
    const { uploadCount = 0, lastUploadDate } = user?.publicMetadata || {};
    return lastUploadDate === today ? uploadCount : 0;
  }, [user]);

  useEffect(() => {
    const userPlan = user?.publicMetadata?.plan;
    let maxUploads = 0;
    if (userPlan === 'plan 1') maxUploads = 15;
    else if (userPlan === 'plan 2') maxUploads = 5;
    else if (user) maxUploads = 1;

    const currentUploadCount = getUploadCount();
    const remainingUploads = maxUploads - currentUploadCount;
    setIsUploadDisabled(remainingUploads <= 0);

    if (user) {
      setTooltipText(`You have ${remainingUploads} uploads left today.`);
    } else {
      setTooltipText('Log in to upload images.');
    }
  }, [user, getUploadCount]);

  const handleFileChange = useCallback(async (event) => {
    if (isUploadDisabled) return;

    const file = event.target.files[0];
    if (file) {
      // First, update the local state with the selected file.
      const formImageData = new FormData();
      formImageData.append('image', file);
      setFile(formImageData);

      setSelectedFile(prev => {
        if (prev) {
          URL.revokeObjectURL(prev);
        }
        return URL.createObjectURL(file);
      });

      // Only after successfully updating the local state, update the user's upload count.
      try {
        const currentUploadCount = getUploadCount();
        const newUploadCount = currentUploadCount + 1;
        const today = new Date().toLocaleDateString();

        await user.update({
          publicMetadata: {
            ...user.publicMetadata,
            uploadCount: newUploadCount,
            lastUploadDate: today,
          },
        });
      } catch (error) {
        console.error('Error updating user metadata:', error);
        // Note: If this update fails, the user's UI will still show the selected file,
        // but their upload count won't be incremented. This is a reasonable trade-off
        // to prevent penalizing the user for a backend error.
      }
    }
  }, [setFile, isUploadDisabled, user, getUploadCount]);

  useEffect(() => {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileChange);
    return () => {
      fileInput.removeEventListener('change', handleFileChange);
    };
  }, [handleFileChange]);

  useEffect(() => {
    if (!file && selectedFile) {
      URL.revokeObjectURL(selectedFile);
      setSelectedFile(null);
    }
  }, [file, selectedFile]);

  return (
    <div className="relative" data-tooltip-text={tooltipText}>
      <input type="file" accept="image/*" id="fileInput" name="fileInput" className="hidden" disabled={isUploadDisabled} />
      <label htmlFor="fileInput" className={`cursor-pointer mr-2 ${isUploadDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
    </div>
  );
};

export default ChatInputFile;
