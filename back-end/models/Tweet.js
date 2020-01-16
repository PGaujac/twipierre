/* Mongoose import */
const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  Author: String,
  Date: Date,
  Content: String,
  Likes: Number
});

module.exports = mongoose.model('Tweet', TweetSchema);
