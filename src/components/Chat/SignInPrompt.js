import React, { memo } from 'react';
import { SignedOut, SignInButton } from '@clerk/clerk-react';

const SignInPrompt = ({ t }) => {
  return (
    <div className="flex overflow-y-auto flex-col flex-1 w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg my-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 mt-4 text-gray-800">{t.chatWithAI}</h1>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t.pleaseSignIn}</h1>
          <p className="m-4">{t.mustSignIn}</p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="transition-all duration-300 px-4 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-md hover:scale-105 hover:from-orange-500 hover:to-orange-700">
                {t.signIn}
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default memo(SignInPrompt);
