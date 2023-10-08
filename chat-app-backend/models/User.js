const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, //This should NEVER be plaintext!
});

module.exports = mongoose.model('User', UserSchema);