// Importing required modules from React and creating a new context
import React, { createContext, useState, useEffect } from 'react';

// Create an authentication context
export const AuthContext = createContext();

// AuthProvider component that wraps around the app to provide authentication state
export const AuthProvider = ({ children }) => {
  // State variables for authentication status, token, and username
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  // useEffect hook to check for stored token and username in local storage
  useEffect(() => {
    // Retrieve token and username from local storage
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    // If a token exists in local storage, update state variables
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    // If a username exists in local storage, update the username state variable
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }); // Empty dependency array ensures this useEffect runs only once after initial render

  // Return the AuthContext.Provider to wrap around the application
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        username,
        setUsername
      }}
    >
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};