// Importing React for component creation
import React from 'react';

// ChatRoomList component to display a list of available chat rooms, imports room list and joinRoom function
const ChatRoomList = ({ rooms, joinRoom }) => {
  return (
    <div>
      {/* Header for the chat room list */}
      <h2>Chat Rooms</h2>
      
      {/* Unordered list to display chat rooms */}
      <ul>
        {/* Mapping through the 'rooms' array to create a list item for each room */}
        {rooms.map((room, index) => (
          <li key={index}>
            {/* Button to join a specific chat room, triggers 'joinRoom' function */}
            <button onClick={() => joinRoom(room)}>Join {room}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporting the ChatRoomList component for use in other parts of the application
export default ChatRoomList;