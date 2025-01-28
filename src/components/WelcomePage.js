import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold text-gray-800 mb-4">
          🌟 Invitation to Explore the AI Assistant for Your Studies 🌟
        </h1>
        <p className="text-lg mb-4">
          I'm excited to introduce the <strong>AI Assistant</strong>—a new tool designed to help you study and review your lessons independently, with guidance tailored to the Moroccan education system.
        </p>
        <h2 className="font-semibold text-lg mb-2">Key Features:</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Personalized Learning: The AI remembers your progress, offering unique interactions every time.</li>
          <li>Real-Time Quizzes: Answer AI-generated quizzes and get instant feedback.</li>
          <li>Create Your Own Prompts: Learn how to interact with the AI by crafting your own questions in a safe, controlled environment.</li>
          <li>Feedback for Improvement: Help us refine the system by sharing your thoughts.</li>
        </ul>
        <p className="mb-4">Supported Lessons: Géométrie de quelques molécules (Geometry of Some Molecules)</p>
        <div className="flex justify-center mt-6">
          <Link to="/chat" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Explore AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

