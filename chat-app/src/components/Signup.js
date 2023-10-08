// Importing React and useState hook for component creation and state management
import React, { useState } from 'react';

// SignupForm component for handling user registration
const SignupForm = ({ onSignup }) => {
  // State variables for username, email, and password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Make an asynchronous POST request to the registration endpoint
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }), // Send username, email, and password as JSON payload
    });

    // Parse the JSON response
    const data = await response.json();

    // Call the onSignup function passed as a prop, passing in the token and username
    onSignup(data.token, data.username);
  };

  // Render the signup form
  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for username */}
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Input field for email */}
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Input field for password */}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Submit button for the form */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

// Exporting the SignupForm component for use in other parts of the application
export default SignupForm;
