import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

function PromptForm({ onImageClick }) {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [selectedModel, setSelectedModel] = useState('Model A');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) {
      alert('Please enter a valid prompt.');
      return;
    }
    setIsLoading(true);
    setSubmittedPrompt(prompt);
    setPrompt('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: prompt, model: selectedModel }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiResponse(data);
      setSelectedPrompts([]);
    } catch (error) {
      console.error('Error posting data:', error);
      setApiResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSelection = (event, prompt) => {
    if (event.target.checked) {
      setSelectedPrompts([...selectedPrompts, prompt]);
    } else {
      setSelectedPrompts(selectedPrompts.filter((p) => p !== prompt));
    }
  };

  const handleSelectedSubmit = async () => {
    if (selectedPrompts.length === 0) {
      alert('Please select at least one prompt.');
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompts: selectedPrompts, model: selectedModel }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiResponse(data);
      setUrls(data.urls && Array.isArray(data.urls) ? data.urls : []);
      console.log('Selected prompts submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting selected prompts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Enter your prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Boy playing soccer"
          aria-label="Enter your prompt"
        />
        <label htmlFor="model">Choose Model:</label>
        <select
          id="model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="Model A">Model A</option>
          <option value="Model B">Model B</option>
          <option value="Model C">Model C</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {submittedPrompt && (
        // ...existing code: exibição do prompt submetido...
        <div className="submitted-prompt">
          <h2>Submitted Prompt:</h2>
          <p>{submittedPrompt}</p>
        </div>
      )}

      {apiResponse && (
        <div className="api-response">
          <h2>API Response:</h2>
          {apiResponse.error ? (
            <p className="error">Error: {apiResponse.error}</p>
          ) : (
            <>
              {apiResponse.prompts && (
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
                </>
              )}
              {selectedPrompts.length > 0 && (
                <div className="selected-prompts">
                  <h3>Selected Prompts:</h3>
                  <ul>
                    {selectedPrompts.map((prompt, index) => (
                      <li key={index}>{prompt}</li>
                    ))}
                  </ul>
                  <button onClick={handleSelectedSubmit} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Selected Prompts'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {urls.length > 0 && (
        <div className="urls-list">
          <h2>Generated Thumbnails:</h2>
          <div className="thumbnails-container">
            {urls.map((url, index) => (
              <div
                key={index}
                className="thumbnail"
                onClick={() => onImageClick(url)}
              >
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                />
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thumbnail-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Full Image
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {apiResponse && !apiResponse.error && (
        // ...existing code: exibição completa da resposta da API...
        <div className="api-response-list">
          <h2>Full API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default PromptForm;
