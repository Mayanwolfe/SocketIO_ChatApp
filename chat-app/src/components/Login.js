// Importing React and useState hook for component creation and state management
import React, { useState } from 'react';

// LoginForm component for handling user login
const LoginForm = ({ onLogin }) => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Make an asynchronous POST request to the login endpoint
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Send username and password as JSON payload
    });

    // Parse the JSON response
    const data = await response.json();

    // Call the onLogin function passed as a prop, passing in the token and username
    onLogin(data.token, data.username);
  };

  // Render the login form
  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for username */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Input field for password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Submit button for the form */}
      <button type="submit">Login</button>
    </form>
  );
};

// Exporting the LoginForm component for use in other parts of the application
export default LoginForm;
