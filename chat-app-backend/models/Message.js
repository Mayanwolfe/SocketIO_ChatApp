// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the schema for the Message model
const MessageSchema = new mongoose.Schema({
  // The chat room to which this message belongs
  room: String,
  // The content of the message
  content: String,
  // Reference to the User model to identify who sent the message
  // The ObjectId from the User document is stored here
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Timestamp indicating when the message was sent
  // Defaults to the current date and time
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the Message model based on the defined schema
// This model will be used to interact with the 'messages' collection in MongoDB
module.exports = mongoose.model('Message', MessageSchema);