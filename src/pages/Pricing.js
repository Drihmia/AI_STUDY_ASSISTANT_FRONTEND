
import React, { useState, useContext } from 'react';
import { useUser, SignUpButton } from "@clerk/clerk-react";
import { GlobalContext } from '../context/GlobalContext';
import { translations } from '../locales/translations_pricing';
import Benefits from '../components/Pricing/Benefits';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { isSignedIn } = useUser();
  const { language } = useContext(GlobalContext);
  const t = translations[language].pricing;

  const plans = {
    monthly: {
      plan2: { price: 10, name: t.standard },
      plan1: { price: 20, name: t.premium },
    },
    yearly: {
      plan2: { price: 90, name: t.standard },
      plan1: { price: 180, name: t.premium },
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">{t.title}</h1>
            <p className="mt-4 text-xl text-gray-600">{t.subtitle}</p>
            <div className="mt-8 flex justify-center">
              <div className="relative flex items-center p-1 bg-gray-200 rounded-full">
                  <button onClick={() => setBillingCycle('monthly')} className={`w-1/2 px-6 py-2 text-lg font-semibold rounded-full transition-colors duration-300 ${billingCycle === 'monthly' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600'}`}>{t.monthly}</button>
                  <button onClick={() => setBillingCycle('yearly')} className={`w-1/2 px-6 py-2 text-lg font-semibold rounded-full transition-colors duration-300 ${billingCycle === 'yearly' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600'}`}>{t.yearly}</button>
              </div>
            </div>
        </div>

        <div className={`flex flex-col lg:items-stretch lg:space-x-8 ${language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          {/* Benefits for non-logged-in users */}
          {!isSignedIn && <Benefits t={t} />}

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
            {Object.keys(plans[billingCycle]).map(planKey => {
              const plan = plans[billingCycle][planKey];
              const isPremium = plan.name === t.premium;

              return (
                <div key={plan.name} className={`border-2 rounded-xl p-8 h-full flex flex-col ${isPremium ? 'border-orange-500' : 'border-gray-300'}`}>
                  <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
                  <div className="mt-4 text-center text-gray-900">
                      <span className="text-5xl font-extrabold">{plan.price} {t.currency}</span>
                      <span className="text-lg font-medium text-gray-500">/{billingCycle === 'monthly' ? t.perMonth : t.perYear}</span>
                  </div>
                  <ul className="mt-8 space-y-4 text-lg text-gray-600 flex-grow">
                      {features.map(feature => {
                        const featureValue = feature[planKey];
                        const featureText = typeof featureValue === 'string' ? `${feature.name}: <strong>${featureValue}</strong>` : feature.name;
                        return (
                          <li key={feature.name} className={`flex items-start ${!featureValue && "text-gray-400"}`}>
                              <svg className={`flex-shrink-0 h-6 w-6 mr-2 ${featureValue ? 'text-green-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {featureValue ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />}
                              </svg>
                              <span dangerouslySetInnerHTML={{ __html: featureText }} />
                          </li>
                        );
                      })}
                  </ul>
                  <div className="mt-8">
                    {isSignedIn ? (
                      <Link to={`/contact?plan=${plan.name}&billing=${billingCycle}`} className={`w-full text-lg font-semibold py-3 rounded-lg text-center ${isPremium ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-800 text-white hover:bg-gray-900'}`}>
                        {t.contact}
                      </Link>
                    ) : (
                      <SignUpButton mode="modal">
                        <button className={`w-full text-lg font-semibold py-3 rounded-lg ${isPremium ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-800 text-white hover:bg-gray-900'}`}>
                            {t.getStarted}
                        </button>
                      </SignUpButton>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
