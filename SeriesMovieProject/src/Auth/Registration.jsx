// Registration.js
import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/register', { username, password });
      alert('Registration successful');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </label>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Registration;