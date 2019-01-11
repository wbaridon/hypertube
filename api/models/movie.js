const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  imbdId: String,
  title: String,
  year: Number,
});

const Movie = mongoose.model('movie', UserSchema);

module.exports = Movie;
