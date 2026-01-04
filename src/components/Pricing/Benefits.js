
import React from 'react';
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const Benefits = ({ t }) => {
  return (
    <div className="mt-12 lg:mt-0 lg:w-1/3 lg:max-w-md flex-shrink-0">
      <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 text-center h-full flex flex-col">
          <h2 className="text-3xl font-extrabold text-gray-900">{t.whySignUp}</h2>
          <p className="mt-4 text-lg text-gray-600">{t.signUpBenefit}</p>
          <div className="flex-grow">
            <ul className="mt-6 text-left inline-block space-y-3 text-gray-700">
                <li className="flex items-center text-lg"><svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{t.signUpBenefit1}</li>
                <li className="flex items-center text-lg"><svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{t.signUpBenefit2}</li>
                <li className="flex items-center text-lg"><svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{t.signUpBenefit3}</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <SignUpButton mode="modal"><button className="px-8 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 w-full sm:w-auto">{t.signUp}</button></SignUpButton>
              <SignInButton mode="modal"><button className="px-8 py-3 text-lg font-semibold text-orange-600 bg-white rounded-lg border-2 border-orange-500 hover:bg-orange-50 w-full sm:w-auto">{t.logIn}</button></SignInButton>
          </div>
      </div>
    </div>
  );
};

export default Benefits;
