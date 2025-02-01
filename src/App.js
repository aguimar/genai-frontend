import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedPrompt(prompt);
    setPrompt(''); // Clear the input after submission

    try {
      const response = await fetch('http://localhost:8080/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data); // Set the API response in state
      setSelectedPrompts([]); // Reset selected prompts when new data is fetched
      // Mocking the API response with 5 decorated image prompts
      const mockResponse = [
        { id: 1, prompt: 'Decorated Image Prompt 10' },
        { id: 2, prompt: 'Decorated Image Prompt 20' },
        { id: 3, prompt: 'Decorated Image Prompt 3' },
        { id: 4, prompt: 'Decorated Image Prompt 4' },
        { id: 5, prompt: 'Decorated Image Prompt 5' },
      ];
      setApiResponse(mockResponse);
    } catch (error) {
      console.error('Error posting data:', error.message || error);
      setApiResponse({ error: error.message }); // Set error message in state
    }
  };

  const handlePromptSelection = (event, prompt) => {
    if (event.target.checked) {
      setSelectedPrompts([...selectedPrompts, prompt]); // Add prompt to selected prompts
    } else {
      setSelectedPrompts(selectedPrompts.filter((p) => p !== prompt)); // Remove prompt from selected prompts
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Enter your prompt"
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
            {apiResponse.error ? (
              <p>Error: {apiResponse.error}</p>
            ) : (
              <>
                <h3>Select one or more prompts:</h3>
                <ul>
                  {apiResponse.prompts.map((prompt, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="checkbox"
                          value={prompt}
                          onChange={(e) => handlePromptSelection(e, prompt)}
                        />
                        {prompt}
                      </label>
                    </li>
                  ))}
                </ul>
                {selectedPrompts.length > 0 && (
                  <div className="selected-prompts">
                    <h3>Selected Prompts:</h3>
                    <ul>
                      {selectedPrompts.map((prompt, index) => (
                        <li key={index}>{prompt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;