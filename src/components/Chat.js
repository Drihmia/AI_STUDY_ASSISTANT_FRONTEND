import React, { useEffect, useState, useRef } from "react";
import formatMessage from "./messageformated";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [prev_key, setPrevKey] = useState("");
  const [question_form_id, setQuestionFormId] = useState("");
  
  const messagesEndRef = useRef(null); // Ref for the last message container

  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  // Load chat history
  const loadChatHistory = async () => {
    try {
      const response = await fetch("/api/history");
      if (!response.ok) throw new Error("Failed to load history");
      const data = await response.json();
      let history = data.history;

      // If no chat history exists, initiate a conversation
      if (!history.length) {
        const initResponse = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Salam" }),
        });

        if (!initResponse.ok) throw new Error("Failed to initiate chat");
        const initData = await initResponse.json();

        history = [
          { role: "user", parts: "Salam" },
          { role: "model", parts: formatMessage({ parts: initData.response, role: "model" }) },
        ];
      }

      // Format the message history
      const formattedHistory = history.map((msg) => ({
        role: msg.role,
        parts: formatMessage(msg),
      }));

      setQuestionFormId(data.form_id);
      setMessages(formattedHistory.length ? formattedHistory : [
        { role: 'ai', parts: 'Hello! How can I help you today?' },
      ]);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  // Consolidated form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const jsonData = JSON.stringify(formObject);

    try {
      const response = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData,
      });

      if (!response.ok) throw new Error("Failed to submit the answer");

      // Reload the chat history after form submission
      await loadChatHistory();

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle message submission
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      setMessages([
        ...messages,
        { role: "user", parts: formatMessage({ parts: message, role: "user" }) },
        { role: "model", parts: formatMessage({ parts: data.response, role: "model" }) },
      ]);
      setMessage("");
      setQuestionFormId(data.form_id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    // Function to scroll to the last message
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToBottom();
  }, [messages]); // Trigger the scroll after the messages state is updated

  useEffect(() => {
    const question_form = document.getElementById(question_form_id);
    if (question_form) {
      question_form.style.display = "block";
      question_form.addEventListener("submit", handleSubmit);
    }
  }, [question_form_id]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md w-full text-center py-4">
        <h1 className="text-3xl font-bold">🌟 AI Study Assistant 🌟</h1>
      </header>

      {/* Main Chat Section */}
      <div className="flex overflow-y-auto flex-col flex-1 w-full max-w-lg mx-auto bg-white shadow-md rounded-lg">
        {/* Messages */}
        <div
          id="messages"
          className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-t-md"
        >
          {messages.map((msg, index) => {
            const direction = arabicRegex.test(msg.parts) ? "rtl" : "ltr";
            return (
              <div
                key={index}
                className={`mb-4 ${
                  direction === "ltr" ? "text-left" : "text-right"
                }`}
                dir={direction}
              >
                <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
                <div
                  dangerouslySetInnerHTML={{ __html: msg.parts }}
                />
              </div>
            );
          })}
          {/* Reference to the last message */}
          <div ref={messagesEndRef} />
        </div>

        {/* Form */}
        <form
          onSubmit={handleMessageSubmit}
          className="flex items-center space-x-2 p-2 bg-gray-100"
        >
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && prev_key === "Shift") {
                e.preventDefault(); // Prevents adding a new line
                setMessage((message) => `${message}\n`);
              }
              if (e.key === "Enter" && prev_key !== "Shift") {
                e.preventDefault();
                handleMessageSubmit(e); // Triggers the submit function
              }
              setPrevKey(e.key);
            }}
            className="w-full p-2 border rounded-md"
            placeholder="Type your message here..."
            maxLength="500"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Send
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-4">
        <p className="text-sm text-gray-600">
          Powered by DRIHMIA AI | Your Personal Study Assistant
        </p>
      </footer>
    </div>
  );
};

export default Chat;

