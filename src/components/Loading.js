import React from "react";
import { SignedOut, SignInButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';



const Loading = ({ location = '/'} ) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/'); // This goes back to the previous page in history
  };

  if (location === "chatSubmitMessage") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (location === 'login') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">

          <button
            onClick={handleGoBack}
            className="mt-4 text-gray-700 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ⬅ Back
          </button>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="mt-4 text-gray-700 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      { location === "/chat" ? (
        <p className="mt-4 text-gray-700 text-lg">Loading Chat...</p>
      ) : (
        <p className="mt-4 text-gray-700 text-lg">Loading...</p>
      )
      }

    </div>
  );
};

export default Loading;
