import React, { useEffect, useState, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [prev_key, setPrevKey] = useState("");
  const [question_form_id, setQuestionFormId] = useState("");
  const messagesEndRef = useRef(null);
  const formRef = useRef(null);

  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  const loadChatHistory = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/history");
    console.log('response', response);
    const data = await response.json();
    console.log('data', data);
    const history = data.history;
    console.log('from loadChatHistory data.form_id', data);
    setQuestionFormId(data.form_id);
    console.log('data.history', history);
    setMessages(history || []);
  };

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    console.log('inside handleFormSubmit');
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const jsonData = JSON.stringify(formObject);

    console.log('before fetching /api/answers jsonData:', jsonData);
    fetch('http://127.0.0.1:5000/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonData,
    })
      .then(response => response.json())
      .then(data => {
        loadChatHistory(); // Refresh the chat history after form submission
      })
      .catch(error => console.error('Error:', error));

    console.log('after fetching /api/answers');
    // Keep the latest message in view
    const messagesDiv = document.getElementById('messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        console.log('messagesEndRef.current.scrollTop', messagesEndRef.current.scrollTop);
        console.log('messagesEndRef.current.scrollHeight', messagesEndRef.current.scrollHeight);
      }
    };
    setTimeout(scrollToBottom, 1); // Delay scroll adjustment for DOM updates
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log('data-----', data);
    if (data) {
      setMessages([
        ...messages,
        { role: "user", parts: message },
        { role: "ai", parts: data.response },
      ]);
      setMessage("");
      console.log('from handleSubmit data.form_id', data.form_id);
      setQuestionFormId(data.form_id);
    }

  };

  useEffect(() => {
    console.log('inside useEffect question_form_id:', question_form_id);
    const question_form = document.getElementById(question_form_id);
    console.log('question_form', question_form);
    if (question_form) {
      question_form.style.display = "block";
      question_form.addEventListener('submit', handleFormSubmit);
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
          ref={messagesEndRef}
          id="messages"
          className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-t-md"
        >
          {messages.map((msg, index) => {
            const direction = arabicRegex.test(msg.parts) ? "rtl" : "ltr";
            return (
              <div
                key={index}
                className={`mb-4 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
                dir={direction}
              >
                <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: msg.role === "user"
                      ? msg.parts.replace("\n", "<br>")
                      : msg.parts,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
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
                handleSubmit(e); // Triggers the submit function
              }
              setPrevKey(e.key);
            }}
            className="w-full p-2 border rounded-md"
            placeholder="Type your message here..."
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

