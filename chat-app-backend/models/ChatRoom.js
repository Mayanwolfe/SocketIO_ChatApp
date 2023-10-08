const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);