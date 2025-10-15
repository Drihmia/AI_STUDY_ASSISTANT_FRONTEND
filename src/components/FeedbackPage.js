import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { GlobalContext } from "../context/GlobalContext";
import { translations } from "../locales/translations_feedback";

const FeedbackPage = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const { language, serverStatus } = useContext(GlobalContext);
  const t = useMemo(() => translations[language || "fr"], [language]);
  const { user, isSignedIn } = useUser();


  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  document.title = t.title;

  const fetchFeedback = useCallback(async (cursorParam = null) => {
    try {
      setLoading(true);
      setError(null);
      const url = cursorParam 
        ? `${BACKEND_URL}/api/feedback?limit=10&cursor=${cursorParam}`
        : `${BACKEND_URL}/api/feedback?limit=10`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(t.errorLoadingFeedback);
      
      const data = await response.json();
      
      if (cursorParam) {
        setFeedbackList(prev => [...prev, ...data.items]);
      } else {
        setFeedbackList(data.items);
      }
      
      setCursor(data.nextCursor || null);
      setHasMore(!!data.nextCursor);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [BACKEND_URL, t.errorLoadingFeedback]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    if (!user) {
      setError(t.signInToSubmit);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      const { firstName, lastName, primaryEmailAddress : emailAdresses } = user || {};

      const response = await fetch(`${BACKEND_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: feedbackText.trim(),
          rating,
          fullName: firstName && lastName ? `${firstName} ${lastName}` : "Anonymous",
          emailAdress: emailAdresses ? emailAdresses.toString() : "",
          userId: user.id,

        })
      });

      if (!response.ok) throw new Error(t.errorSubmittingFeedback);

      setSuccess(true);
      setFeedbackText("");
      setRating(5);
      
      setTimeout(() => {
        fetchFeedback();
      }, 500);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const loadMore = () => {
    if (cursor && !loading) {
      fetchFeedback(cursor);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          {t.pageTitle}
        </h1>

        <SignedOut>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
            <p className="text-gray-600 mb-4">{t.signInToSubmit}</p>
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-700 transition">
                {t.signInButton}
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        {isSignedIn && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t.submitFeedback}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {t.ratingLabel}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl transition ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      } hover:scale-110`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {t.feedbackLabel}
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows="4"
                  maxLength="500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder={t.feedbackPlaceholder}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {feedbackText.length}/500 {t.characters}
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
                disabled={submitting || !feedbackText.trim()}
                className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t.submitting : t.submitButton}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t.allFeedback}</h2>

          { (serverStatus === 'offline' || serverStatus === 'starting') ? (
                <div className="flex overflow-y-auto flex-col flex-1 w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg my-4">
                  <div className={`text-center p-2 text-gray-500 ${serverStatus === 'starting'? "bg-yellow-100": "bg-red-100"}`}>
                    {serverStatus === 'starting'? t.serverStarting: t.serverOffline}
                  </div>
                </div>
              ) :

          loading && feedbackList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">{t.loading}</div>
          ) : feedbackList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">{t.noFeedback}</div>
          ) : (
            <>
              <div className="space-y-4">
                {feedbackList.map((feedback, index) => (
                  <div
                    key={feedback._id || index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {feedback.displayName || t.anonymous}
                        </span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < (feedback.rating || 5) ? "★" : "☆"}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString(language)}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{feedback.text}</p>
                  </div>
                ))}
              </div>

              {hasMore && (
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="w-full mt-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                  {loading ? t.loading : t.loadMore}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
