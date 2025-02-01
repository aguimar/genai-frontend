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
      // Mocking the API response
      const mockResponse = { message: 'This is a mocked response' };
      setApiResponse(mockResponse.message);
    } catch (error) {
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
