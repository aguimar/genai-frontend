import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Simulação de autenticação
    if (username === 'admin' && password === 'password') {
      onLoginSuccess();
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
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
  );
}

export default Login;
