import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  // Fetch history on load
  useEffect(() => {
    axios.get("http://localhost:5002/history").then((res) => {
      setHistory(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    try {
      const res = await axios.post("http://localhost:5002/generate", { prompt });
      setResponse(res.data.response);
      setHistory([...history, res.data]);
      setPrompt("");
    } catch (err) {
      console.error("Error generating content:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Content Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="4"
          cols="50"
          style={{ display: "block", marginBottom: "10px" }}
        />
        <button type="submit">Generate</button>
      </form>
      <h2>Response</h2>
      <p>{response}</p>
      <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <strong>Prompt:</strong> {entry.prompt} <br />
            <strong>Response:</strong> {entry.response}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
