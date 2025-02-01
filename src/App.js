import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState([]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedPrompt(prompt);
    setPrompt(''); // Clear the input after submission

    try {
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
        {submittedPrompt && <p>Submitted Prompt: {submittedPrompt}</p>}
        {apiResponse.length > 0 && (
          <div>
            <h3>Choose a decorated image prompt:</h3>
            <ul>
              {apiResponse.map((item) => (
                <li key={item.id}>{item.prompt}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;