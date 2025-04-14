import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:8080/api/chat", {
        prompt: prompt,
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Ask ChatGPT
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Type your question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Asking..." : "Ask"}
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-gray-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <p className="text-gray-800 whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
