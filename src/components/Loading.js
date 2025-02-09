import React from "react";

const Loading = ({ location = '/'} ) => {

  console.log('Loading location:', location);
  if (location === "chatSubmitMessage") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
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
