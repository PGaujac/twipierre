const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  tweets: Array
});

UsersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UsersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UsersSchema.pre('save', function(next) {
  if (!this.password) {
    next();
  } else {
    this.password = this.generateHash(this.password);
    next();
  }
});

module.exports = mongoose.model('Users', UsersSchema);
