import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import PromptForm from './components/PromptForm';
import Modal from './components/Modal';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalProps, setModalProps] = useState({ isOpen: false, imageUrl: null });
  
  const handleImageClick = (url) => {
    setModalProps({ isOpen: true, imageUrl: url });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Prompt Generator</h1>
        {!isAuthenticated ? (
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        ) : (
          <PromptForm onImageClick={handleImageClick} />
        )}
        {modalProps.isOpen && (
          <Modal 
            imageUrl={modalProps.imageUrl} 
            onClose={() => setModalProps({ ...modalProps, isOpen: false })}
          />
        )}
      </header>
    </div>
  );
}

export default App;