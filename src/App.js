import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedPrompt(prompt);
    setPrompt(''); // Clear the input after submission
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prompt Input Screen</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="prompt">Enter your prompt:</label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Type your prompt here"
          />
          <button type="submit">Submit</button>
        </form>
        {submittedPrompt && (
          <div className="submitted-prompt">
            <h2>Submitted Prompt:</h2>
            <p>{submittedPrompt}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;