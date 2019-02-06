const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieHistorySchema = new Schema({
  id: String
});

const WatchListSchema = new Schema({
  id: String
});

const UserSchema = new Schema({
  email: String,
  userName: String,
  picture: String,
  lastName: String,
  firstName: String,
  password: String,
  locale: String,
  darkTheme: Boolean,
  oauth: Boolean,
  profilIsFill: Boolean,
  moviesHistory: [MovieHistorySchema],
  watchList: [WatchListSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
