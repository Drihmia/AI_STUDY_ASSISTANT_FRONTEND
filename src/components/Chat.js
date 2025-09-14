import React, { useEffect, useState, useRef, useCallback, useContext, useMemo } from "react";
import { useUser } from '@clerk/clerk-react'
import {  SignedOut, SignInButton, } from "@clerk/clerk-react";

import formatMessage from "./messageformated";
import Loading from "./Loading";
import { GlobalContext } from "../context/GlobalContext";
import { translations } from "../locales/translations_chat"; // Import translations



const Chat = () => {

  const FRONT_END_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
  console.log("FRONT_END_URL:", FRONT_END_URL);
  // Get the language from the global context
  const { language } = useContext(GlobalContext);

  const t = useMemo(() => {
    return translations[language || "fr"];;
  }, [language]);

  document.title = t.title;

  const { user, isLoaded, isSignedIn } = useUser();
  //console.log(isLoaded, useUser());
  const user_id = user?.id;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error_message, setError] = useState(null);
  const [isLoadingMsg, setIsLoading] = useState(true);
  const [question_form_id, setQuestionFormId] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [count, setCount] = useState(4);
  const retryTimerRef = useRef(null);


  // Initialize the chat with a greeting message depending on the user's preferred language
  const messagesEndRef = useRef(null); // Ref for the last message container
  const textAreaRef = useRef(null); // Ref for the text area

  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  console.log("Chat component rendered", count, error_message);

  // Load chat history
  const loadChatHistory = useCallback(async () => {
    //console.log('user id frm inside loadChatHistory', user_id);
    try {
      if (!isSignedIn) return;
      setError(null);
      setIsLoading(true);
      const response = await fetch(`${FRONT_END_URL}/api/history?user_id=${user_id}`)

      // if the code start with 5xx or 4xx
      if (response.status >= 500) {
        throw new Error(t.FailedToLoadHistory);
      }

      const data = await response.json();
      if ('error' in data) {
        throw new Error(data.error);
      }
      if (!response.ok) throw new Error(t.FailedToLoadHistory);
      let history = data.history;

      // If no chat history exists, initiate a conversation
      if (!history.length) {
        const initResponse = await fetch(`${FRONT_END_URL}/api/chat?user_id=${user_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: t.greeting }),
        });

        // if the code start with 5xx or 4xx
        if (initResponse.status >= 500) {
          throw new Error(t.FailedToLoadHistory);
        }

        const initData = await initResponse.json();
        if ('error' in initData) {
          throw new Error(initData.error);
        }
        if (!initResponse.ok) throw new Error(t.FailedToInitializeChat);

        history = [
          { role: "user", parts: t.greeting },
          { role: "model", parts: formatMessage({ parts: initData.response, role: "model" }) },
        ];
      }

      // Format the message history
      const formattedHistory = history.map((msg) => ({
        role: msg.role,
        parts: formatMessage(msg),
      }));

      setQuestionFormId(data.form_id);
      setMessages(formattedHistory);
    } catch (error) {
      setError(error.message);
      console.error("Error loading chat history:", error.message);
      // in loadChatHistory error
      retryTimerRef.current = setTimeout(() => {
        setError(null);
        // Reload chat history after 5 seconds
        setCount(5);
        loadChatHistory();
      }
        , 5000);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [user_id, language, isSignedIn, t]);

  // Consolidated form submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    setIsButtonDisabled(true);

    // Append the language to the form data
    formObject.language = language;
    let jsonData = JSON.stringify(formObject);


    try {
      setError(null);
      const response = await fetch(`${FRONT_END_URL}/api/answers?user_id=${user_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData,
      });

      // if the code start with 5xx or 4xx
      if (response.status >= 500) {
        throw new Error(t.FailedToLoadHistory);
      }

      if (!response.ok) throw new Error(t.errorMessage);

      // Reload the chat history after form submission
      await loadChatHistory();

    } catch (error) {
      setError(error.message);
      console.error("Error submitting form:", error);

    } finally {
      setIsButtonDisabled(false);
    }
  }, [language, user_id, loadChatHistory, t, FRONT_END_URL]);

  // Handle message submission
  const handleMessageSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Disables the button to prevent multiple submissions
    setIsButtonDisabled(true);
    setError(null);
    setSendingMessage(true);

    // Add the user message to the chat
    setMessages([
      ...messages,
      { role: "user", parts: formatMessage({ parts: message, role: "user" }) },
    ]);

    // Fetch the response from the server
    try {
      const response = await fetch(`${FRONT_END_URL}/api/chat?user_id=${user_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      // if the code start with 5xx
      if (response.status >= 500) {
        throw new Error(t.FailedToLoadHistory);
      }

      const data = await response.json();
      if ('error' in data) {
        throw new Error(data.error);
      }

      if (!response.ok) throw new Error(t.errorMessage);

      // Add the model response to the chat
      setMessages(prevMes => [
        ...prevMes.slice(0,-1),
        { role: "user", parts: formatMessage({ parts: data.user_message, role: "user" }) },
        { role: "model", parts: formatMessage({ parts: data.response, role: "model" }) },
      ]);

      // Set the form ID if it exists
      setQuestionFormId(data.form_id);

      // Release the button - enable it
      setIsButtonDisabled(false);

      // Clears the message input
      setMessage("");
      setSendingMessage(false);
    } catch (error) {
      setCount(4);

      // Add an error message to the chat
      setError(error.message);
      console.error("Error sending message:", error);

      setIsButtonDisabled(true);

      // Remove the last message from the chat after 4 seconds
      setTimeout(() => {
        setSendingMessage(false);
        setMessages(prevMes => [...prevMes.slice(0,-1)]);
        setError(null);
        setIsButtonDisabled(false);
      }, 4000);
    }
  }, [message, user_id, messages, t, FRONT_END_URL]);

  useEffect(() => {
    if (count <= 0 || !error_message) return; // Stop when count reaches 0

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 0) {
          clearInterval(timer); // Stop the timer when count reaches 0
          return prev;
        }
        return prev - 1
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or re-run
    // eslint-disable-next-line
  }, [error_message]);

  useEffect(() => {
    return () => clearTimeout(retryTimerRef.current);
  }, []);


  useEffect(() => {
    if (isSignedIn) {
      loadChatHistory();
    }
    // eslint-disable-next-line
  }, [isSignedIn]);

  useEffect(() => {
    // Function to scroll to the last message
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToBottom();
  }, [messages, error_message]); // Trigger the scroll after the messages state is updated

  useEffect(() => {
    const question_form = document.getElementById(question_form_id);
    if (question_form) {
      question_form.style.display = "block";
      question_form.addEventListener("submit", handleSubmit);
      return () => question_form.removeEventListener("submit", handleSubmit);
    }
    // eslint-disable-next-line
  }, [question_form_id]);

  useEffect(() => {
    if ((isLoadingMsg && !error_message)) {
      setIsLoading(false);
    }
  }, [isLoadingMsg, error_message]);

  if ((isLoadingMsg && !error_message) || (!isLoaded)) {
    return <Loading location="/chat" />;
  }

  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex overflow-y-auto flex-col flex-1 w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg my-4">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Please Sign In</h1>
            <p className="m-4">You need to sign in to access the chat.</p>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="transition-all duration-300 px-4 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-md hover:scale-105 hover:from-orange-500 hover:to-orange-700">
                  🔐 Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    );
  }

  //if (!isLoaded) {
  //return <Loading location="login" />;
  //}

  return (
    <>
      {/* Main Chat Section */}
      <div className="flex overflow-y-auto flex-col flex-1 w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg">
        {/* Messages */}
        <div
          id="messages"
          className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-t-md"
        >
          {messages.map((msg, index) => {
            const direction = arabicRegex.test(msg.parts) ? "rtl" : "ltr";
            return (
              <div
                key={index}
                className={`mb-4 overflow-x-auto ${
                  direction === "ltr" ? "text-left" : "text-right"
                }  p-2 rounded-md odd:bg-blue-500 odd:text-white even:bg-gray-200 even:text-gray-900 odd:mr-1 even:ml-1`}
                dir={direction}
              >
                {/* <strong>{msg.role === "user" ? "You" : "AI"}:</strong> */}
                <div
                  dangerouslySetInnerHTML={{ __html: msg.parts }}
                />
              </div>
            );
          })}
          {/* Reference to the last message */}
          {error_message && (
            <div className="text-red-500 text-center bg-red-200 p-2 rounded-md">
              <p>{ error_message } <strong>{count}</strong></p> 
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Form */}
        <form
          onSubmit={handleMessageSubmit}
          className="flex items-center space-x-2 p-2 bg-gray-100 "
        >
          <textarea
            id="message"
            rows="2"
            autoFocus
            aria-label="Type your message"
            ref={textAreaRef}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              //if (e.key === "Enter" && prev_key === "Shift") {
              //e.preventDefault(); // Prevents adding a new line
              //setMessage((message) => `${message}\n`);
              //}
              //if (e.key === "Enter" && prev_key !== "Shift") {
              //e.preventDefault();
              //handleMessageSubmit(e); // Triggers the submit function
              //}
              //setPrevKey(e.key);
            }}
            className={ `w-full h-full p-2 border-gray-300 rounded-md bg-white ${
              sendingMessage ? "text-gray-300" : "text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none ${
              arabicRegex.test(message || t.placeholderText) ? "text-right" : "text-left" // Takes into account the placeholder text
              }`}
            placeholder={t.placeholderText}
            maxLength="1000"
            required
          />
          <button
            type="submit"
            disabled={isButtonDisabled}
            aria-label="Send message"
            className="h-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700 flex justify-center items-center w-24 h-[85%]"
          >
            {isButtonDisabled ? (
              <div className="animate-spin rounded-full h-9 w-9 border-4 border-t-transparent border-white"></div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-[90%] h-[90%]"
              >
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;

