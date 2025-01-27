import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedPrompt(prompt);
    setPrompt(''); // Clear the input after submission

    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApiResponse(data.message);
    } catch (error) {
      setApiResponse('Error fetching response');
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Prompt Generator</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="prompt">Enter your prompt:</label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Boy playing soccer"
          />
          <button type="submit">Submit</button>
        </form>
        {submittedPrompt && (
          <div className="submitted-prompt">
            <h2>Submitted Prompt:</h2>
            <p>{submittedPrompt}</p>
          </div>
        )}
        {apiResponse && (
          <div className="api-response">
            <h2>API Response:</h2>
            <p>{apiResponse}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
