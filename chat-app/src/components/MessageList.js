// Importing React for component creation
import React from 'react';

// MessageList component to display a list of chat messages
const MessageList = ({ messages }) => {
  // Reverse the array of messages so the oldest message appears first
  const reversedMessages = [...messages].reverse();
  return (
    <div>
      {/* Header for the message list */}
      <h2>Messages</h2>
      
      {/* Unordered list to display messages */}
      <ul>
        {/* Mapping through the 'messages' array to create a list item for each message */}
        {reversedMessages.map((message, index) => (
          <li key={index}>
            {/* Display the timestamp of the message */}
            <span className="timestamp">
              {new Date(message.timestamp).toLocaleString()}:
            </span>
            {/* Display the username of the sender or 'Anonymous' if not available */}
            <span className="username">
              {message.user ? message.user.username : 'Anonymous'}-
            </span>
            {/* Display the content of the message */}
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporting the MessageList component for use in other parts of the application
export default MessageList;
