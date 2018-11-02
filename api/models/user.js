const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieHistorySchema = new Schema({
  id: Number
});

const UserSchema = new Schema({
  email: String,
  login: String,
  picture: String,
  name: String,
  firstname: String,
  password: String,
  langue: Number,
  moviesHistory: [MovieHistorySchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
