import { useState, useEffect } from "react";

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(localStorage.getItem("showBanner") !== "false");
  const [isCMPAvailable, setIsCMPAvailable] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const timeout = 10000; // 10 seconds

    const checkCMP = setInterval(() => {
      const isAvailable = !!window.__fundingChoices?.gcmp?.show;
      const isTimedOut = Date.now() - startTime > timeout;

      if (isAvailable) {
        setIsCMPAvailable(true);
        clearInterval(checkCMP);
      } else if (isTimedOut) {
        console.warn("Google CMP did not become available after 10 seconds.");
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

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <p>This site uses cookies to enhance your experience.</p>
        <div>
          {isCMPAvailable && (
            <button onClick={handleManage} className="underline hover:text-gray-300 mr-4">
              Manage Consent
            </button>
          )}
          <button
            onClick={() => {
              setShowBanner(false);
              localStorage.setItem("showBanner", "false");
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
