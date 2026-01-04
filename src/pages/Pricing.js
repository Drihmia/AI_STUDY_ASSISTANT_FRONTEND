
import React, { useState, useContext } from 'react';
import { useUser, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { GlobalContext } from '../context/GlobalContext';
import { translations } from '../locales/translations_pricing';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { isSignedIn } = useUser();
  const { language } = useContext(GlobalContext);
  const t = translations[language].pricing;

  const plans = {
    monthly: {
      plan1: { price: 20, name: t.premium },
      plan2: { price: 10, name: t.standard },
    },
    yearly: {
      plan1: { price: 180, name: t.premium },
      plan2: { price: 90, name: t.standard },
    },
  };

  const features = [
    { name: t.features.corrections, plan1: true, plan2: true },
    { name: t.features.standardAI, plan1: false, plan2: true },
    { name: t.features.advancedAI, plan1: true, plan2: false },
    { name: t.features.uploads, plan1: "15", plan2: "5" },
    { name: t.features.history, plan1: true, plan2: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          {t.subtitle}
        </p>

        {/* Billing Cycle Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex items-center p-1 bg-gray-200 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`w-1/2 px-6 py-2 text-lg font-semibold rounded-full transition-colors duration-300 ${billingCycle === 'monthly' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600'}`}>
              {t.monthly}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`w-1/2 px-6 py-2 text-lg font-semibold rounded-full transition-colors duration-300 ${billingCycle === 'yearly' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600'}`}>
              {t.yearly}
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {Object.keys(plans[billingCycle]).map(planKey => {
          const plan = plans[billingCycle][planKey];
          const isPremium = plan.name === t.premium;

          return (
            <div key={plan.name} className={`border-2 rounded-xl p-8 flex flex-col ${isPremium ? 'border-orange-500' : 'border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
              <div className="mt-4 text-center text-gray-900">
                <span className="text-5xl font-extrabold">{plan.price} {t.currency}</span>
                <span className="text-lg font-medium text-gray-500">/{billingCycle === 'monthly' ? t.perMonth : t.perYear}</span>
              </div>

              <ul className="mt-8 space-y-4 text-lg text-gray-600 flex-grow">
                {features.map(feature => {
                  const featureValue = feature[planKey];
                  const featureText = typeof featureValue === 'string' ? `${feature.name}: <strong>${featureValue}</strong>` : feature.name;

                  if (featureValue) {
                    return (
                      <li key={feature.name} className="flex items-start">
                        <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span dangerouslySetInnerHTML={{ __html: featureText }} />
                      </li>
                    );
                  } else {
                     return (
                      <li key={feature.name} className="flex items-start text-gray-400">
                         <svg className="flex-shrink-0 h-6 w-6 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        <span>{feature.name}</span>
                      </li>
                    ); 
                  }
                })}
              </ul>

              <div className="mt-8">
                  <SignUpButton mode="modal">
                    <button className={`w-full text-lg font-semibold py-3 rounded-lg ${isPremium ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-800 text-white hover:bg-gray-900'}`}>
                        {t.getStarted}
                    </button>
                  </SignUpButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefits for non-logged-in users */}
      {!isSignedIn && (
        <div className="mt-20 max-w-4xl mx-auto text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900">{t.whySignUp}</h2>
            <p className="mt-4 text-lg text-gray-600">
                {t.signUpBenefit}
            </p>
            <ul className="mt-6 text-left inline-block space-y-3 text-gray-700">
                 <li className="flex items-center text-lg"><svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{t.signUpBenefit1}</li>
                 <li className="flex items-center text-lg"><svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{t.signUpBenefit2}</li>
                 <li className="flex items-center text-lg"><svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{t.signUpBenefit3}</li>
            </ul>
            <div className="mt-8 flex justify-center space-x-4">
                <SignUpButton mode="modal">
                    <button className="px-8 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600">{t.signUp}</button>
                </SignUpButton>
                 <SignInButton mode="modal">
                    <button className="px-8 py-3 text-lg font-semibold text-orange-600 bg-white rounded-lg border-2 border-orange-500 hover:bg-orange-50">{t.logIn}</button>
                </SignInButton>
            </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
