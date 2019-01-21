const mongoose = require('mongoose');
const Movie = require('./movie');

module.exports.getMovie = function (imdbId) {
  return new Promise ((resolve, reject) => {
    Movie.findOne({'imdbId': imdbId}).then(function(result){
      resolve(result)
    })
  })
}

module.exports.getMovieByTitle = function (title) {
  return new Promise ((resolve, reject) => {
    Movie.findOne({'title': title}).then(function(result){
      resolve(result)
    })
  })
}

module.exports.createMovie = function (data) {
  return new Promise ((resolve, reject) => {
    var movie = new Movie({
      imdbId: data.imdbId,
      title: data.title,
      year: data.year,
      cover: data.cover,
      synopsis: data.synopsis,
      torrents: {
        url: data.torrents.url,
      }
    })
    movie.save().then(function(){
      resolve();
    })
  })
}

module.exports.getAllId = function () {
  return new Promise ((resolve, reject) => {
    Movie.find({}, 'imdbId')
    .then(function(result){ resolve(result) },
    (err) => {console.log(err)}
    )
  })
}

module.exports.exist = function (imdbId) {
  return new Promise ((resolve, reject) => {
    Movie.findOne({'imdbId': imdbId}).then(function(result){
      resolve(result)
    })
  })
}

module.exports.update = function (id, data) {
  return new Promise ((resolve, reject) => {
    console.log('Mon id: ' + id)
    Movie.findOneAndUpdate({'imdbId': id}, data)
    .then(function(result){ resolve(console.log(result)) },
    (err) => {console.log(err)}
    )
  })
}
