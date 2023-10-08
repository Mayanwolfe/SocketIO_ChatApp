// Importing required modules and components
import React from 'react';
import { AuthProvider } from './components/AuthContext';  // Importing the AuthProvider component
import AppContent from './AppContent';  // Importing the main AppContent component that contains the application logic

// Main App component
function App() {
  return (
    // Wrapping the AppContent component with AuthProvider to provide authentication context
    <AuthProvider>
      <AppContent />  {/* This is where the main content of the application will be rendered */}
    </AuthProvider>
  );
}

// Exporting the App component for use in the entry point of the application
export default App;
