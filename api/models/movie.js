const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TorrentsSchema = new Schema({
  hash: String,
  quality: String,
  seeds: Number,
  peers: Number,
  language: String
});

const MovieSchema = new Schema({
  cover: String,
  imdbId: String,
  title: String,
  year: Number,
  dateReleased: Number,
  synopsis: String,
  season: Number,
  episode: Number,
  public: String,
  runtime: String,
  genre: String,
  director: String,
  actors: String,
  awards: String,
  imdbRating: String,
  torrents: [TorrentsSchema]
});

const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;
