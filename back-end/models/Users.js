const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  Email: String,
  UserName: String,
  Password: String,
  Tweets: Array
});

module.exports = mongoose.model('Users', UsersSchema);
