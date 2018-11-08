const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieHistorySchema = new Schema({
  id: Number
});

const UserSchema = new Schema({
  email: String,
  userName: String,
  picture: String,
  lastName: String,
  firstName: String,
  password: String,
  locale: String,
  moviesHistory: [MovieHistorySchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
