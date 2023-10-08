// Importing required modules
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const ChatRoom = require('./models/ChatRoom');
const Message = require('./models/Message');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require('bcrypt'); // For password hashing

// Initialize Express app and HTTP server (necessary because we need a place for WebSocket traffic on the same port)
const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS support
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection URI
const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.pztfz.mongodb.net/chat_app?retryWrites=true&w=majority`;


// Connect to MongoDB Atlas
mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.log('MongoDB Atlas connection error:', error);
});

// When a new client connects to the server via Socket.io
io.on('connection', (socket) => {
  // Log that a new client has connected
  console.log('New client connected');

  // Event listener for when a client wants to join a chat room
  socket.on('joinRoom', async ({ room }) => {
    // The client joins the specified room
    socket.join(room);

    // Fetch the last 15 messages for the room from the MongoDB database
    // The 'populate' method replaces the 'user' field (which contains a user ID) with the actual username from the user document
    const messages = await Message.find({ room })
    .sort({ timestamp: -1 })  // Sort by timestamp in descending order
    .limit(15)  // Limit to 15 messages
    .populate('user', 'username');  // Populate the 'user' field

    // Send these messages back to the client so they can see the chat history
    socket.emit('previousMessages', messages);
  });

  // Event listener for when a client wants to send a message
  socket.on('sendMessage', async ({ room, message, userId }) => {
    // Validate the userId by looking it up in the MongoDB User collection
    const user = await User.findById(userId);

    // If the user doesn't exist, exit the function (could also send an error message)
    if (!user) {
      return;
    }

    // Create a new message document and save it to the MongoDB database
    const newMessage = new Message({
      room,
      content: message,
      user: userId,
    });
    await newMessage.save();

    // Populate the 'user' field with the username before sending the message
    await newMessage.populate('user', 'username');

    // Emit the new message to all clients in the room
    io.to(room).emit('newMessage', newMessage);
  });

  // Event listener for when a client disconnects from the server
  socket.on('disconnect', () => {
    // Log that a client has disconnected
    console.log('Client disconnected');
  });
});


// User registration endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); //hash password before saving
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  // Generate a JSON Web Token (JWT) for the user
  // The payload contains the user's ID from MongoDB, labeled as 'userId'
  // The token is signed using a secret key to ensure its integrity
  const token = jwt.sign({ userId: user._id }, 'your-secret-key');
  res.send({ token, username });
});

// User login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid password');
  }
  // Generate a JSON Web Token (JWT) for the user
  // The payload contains the user's ID from MongoDB, labeled as 'userId'
  // The token is signed using a secret key to ensure its integrity
  const token = jwt.sign({ userId: user._id }, 'your-secret-key');
  res.send({ token, username }); 
});

// Start the server
server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
