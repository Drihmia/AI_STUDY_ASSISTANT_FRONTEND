import { useState, useEffect } from "react";

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(localStorage.getItem("showBanner") !== "false");
  const [isCMPAvailable, setIsCMPAvailable] = useState(false);

  useEffect(() => {
    // Wait for Google's Consent Management Platform to be available
    const checkCMP = setInterval(() => {
      if (window.__fundingChoices?.gcmp?.show) {
        setIsCMPAvailable(true);
        clearInterval(checkCMP);
      }
    }, 500); // Check every 500ms

    return () => clearInterval(checkCMP);
  }, []);

  const handleManage = () => {
    if (window.__fundingChoices?.gcmp?.show) {
      window.__fundingChoices.gcmp.show(); // Open Google's CMP
    } else {
      console.warn("Google CMP is not available yet.");
    }
  };

  return showBanner ? (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 text-center flex flex-col md:flex-row justify-between items-center">
      <p className="mb-2 md:mb-0 text-sm">
        This website uses cookies to improve your experience.
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => {
            setShowBanner(false)
            localStorage.setItem("showBanner", "false");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Consent
        </button>
        <button
          onClick={handleManage}
          className={`px-4 py-2 rounded ${
            isCMPAvailable
              ? "bg-gray-600 hover:bg-gray-700 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!isCMPAvailable}
        >
          Manage Options
        </button>
      </div>
    </div>
  ) : null;
};

export default ConsentBanner;

