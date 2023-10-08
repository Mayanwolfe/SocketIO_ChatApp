// Importing React and useState hook for component creation and state management
import React, { useState } from 'react';

// MessageInput component for handling user chat input
const MessageInput = ({ sendMessage }) => {
  // State variable for the chat message
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Call the sendMessage function passed as a prop to send the message
    sendMessage(message);

    // Clear the message input field
    setMessage('');
  };

  // Render the message input form
  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for chat message */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* Submit button to send the message */}
      <button type="submit">Send</button>
    </form>
  );
};

// Exporting the MessageInput component for use in other parts of the application
export default MessageInput;
