const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  UserName: String,
  Email: String,
  Password: String,
  Tweets: Array
});

module.exports = mongoose.model('Users', UsersSchema);
