const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TorrentsSchema = new Schema({
  hash: String,
  quality: String,
  seeds: Number,
  peers: Number,
  language: String
});

const CommentsSchema = new Schema({
  userName: String,
  comment: String,
  postedOn: Number,
  picture: String
});

const MovieSchema = new Schema({
  type: String,
  cover: String,
  imdbId: String,
  title: String,
  year: Number,
  dateReleased: Number,
  synopsis: String,
  season: Number,
  episode: Number,
  public: String,
  runtime: Number,
  genre: Array,
  director: String,
  writer: String,
  actors: Array,
  awards: String,
  imdbRating: Number,
  seeds: Number,
  lastSeen: Number,
  movieOnServer: Boolean,
  file: String,
  torrents: [TorrentsSchema],
  comments: [CommentsSchema]
});

const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;
