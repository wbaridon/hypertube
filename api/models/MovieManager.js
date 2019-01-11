const mongoose = require('mongoose');
const Movie = require('./movie');

module.exports.getMovie = function (imbdId) {
  return new Promise ((resolve, reject) => {
    User.findOne({'imbdId': imbdId}).then(function(result){
      resolve(result)
    })
  })
}

module.exports.getMovieByTitle = function (title) {
  return new Promise ((resolve, reject) => {
    User.findOne({'title': title}).then(function(result){
      resolve(result)
    })
  })
}

module.exports.createMovie = function (data, callback) {
  var movie = new Movie({
    imbdId: data.imbdId,
    title: data.title,
    year: data.year
  })
  movie.save().then(function(){
    callback()
  })
}

module.exports.getAllId = function () {
  return new Promise ((resolve, reject) => {
    User.find({}, 'imbdId')
    .then(function(result){ resolve(result) },
    (err) => {console.log(err)}
    )
  })
}
