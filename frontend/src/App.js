import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    try {
      const res = await fetch("http://localhost:5002/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      // Initialize an empty response string
      let responseText = "";

      // Read the stream of chunks
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const stream = new ReadableStream({
        start(controller) {
          const pump = async () => {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              return;
            }
            // Append the chunk to the response text
            responseText += decoder.decode(value, { stream: true });
            setResponse(responseText);  // Update response as chunks arrive
            pump();
          };
          pump();
        },
      });

      // Consume the stream
      await new Response(stream).text();

      // Optionally, update history or handle the response
      setHistory([...history, { prompt, response: responseText }]);
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
