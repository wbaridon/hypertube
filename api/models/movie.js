const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: String,
});

const Movie = mongoose.model('movie', UserSchema);

module.exports = Movie;
