import React, { useState, useContext, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { GlobalContext } from "../context/GlobalContext";
import { translations } from "../locales/translations_contact";

const ContactTeacher = () => {
  const BACKEND_URL = process.env.REACT_APP_FRONTEND_URL || "https://ai-study-assistant-w29f.onrender.com";
  const { language } = useContext(GlobalContext);
  const t = useMemo(() => translations[language || "fr"], [language]);
  const { user, isSignedIn } = useUser();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  document.title = t.title;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      const token = await user?.getToken();
      const response = await fetch(`${BACKEND_URL}/api/contact-teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: subject.trim(),
          message: message.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t.errorSending);
      }

      setSuccess(true);
      setSubject("");
      setMessage("");
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          {t.pageTitle}
        </h1>

        <SignedOut>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">{t.signInToContact}</p>
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-700 transition">
                {t.signInButton}
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        {isSignedIn && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{t.note}:</span> {t.noteText}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {t.yourEmail}: <span className="font-medium">{user?.primaryEmailAddress?.emailAddress}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {t.subjectLabel}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength="200"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={t.subjectPlaceholder}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {t.messageLabel}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="8"
                  maxLength="2000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder={t.messagePlaceholder}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {message.length}/2000 {t.characters}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {t.successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !subject.trim() || !message.trim()}
                className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t.sending : t.sendButton}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactTeacher;
