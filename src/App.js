import React, { useState } from 'react';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

function App() {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedModel, setSelectedModel] = useState('Model A'); // Default model
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação
  const [username, setUsername] = useState(''); // Estado do nome de usuário
  const [password, setPassword] = useState(''); // Estado da senha

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Simulação de autenticação
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciais inválidas');
    }
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
        body: JSON.stringify({ input: prompt, model: selectedModel }), // Include selected model
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
        body: JSON.stringify({ prompts: selectedPrompts, model: selectedModel }), // Include selected model
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);

      if (data.urls && Array.isArray(data.urls)) {
        setUrls(data.urls);
      } else {
        setUrls([]);
      }

      console.log('Selected prompts submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting selected prompts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const Modal = ({ imageUrl, onClose }) => {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img src={imageUrl} alt="Full Size" className="modal-image" />
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Prompt Generator</h1>
        {!isAuthenticated ? (
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              aria-label="Enter username"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              aria-label="Enter password"
            />
            <button type="submit">Login</button>
          </form>
        ) : (
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
                      onClick={() => {
                        setSelectedImage(url);
                        setIsModalOpen(true);
                      }}
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
            {isModalOpen && (
              <Modal
                imageUrl={selectedImage}
                onClose={() => setIsModalOpen(false)}
              />
            )}
            {apiResponse && !apiResponse.error && (
              <div className="api-response-list">
                <h2>Full API Response:</h2>
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;