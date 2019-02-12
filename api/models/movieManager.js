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
    var movie = new Movie(data)
    movie.save()
    .then(success => { resolve('createMovie.sucess'); },
      error => { reject('createMovie.error');
    })
  })
}

module.exports.getList = function (query, start, limit, sort, reverse) {
  return new Promise ((resolve, reject) => {
      Movie.find({'title': { $regex: query, $options: 'i'} })
      .skip(start).limit(limit).sort({[sort]: [reverse]})
      .lean()
      .then(function(result){ resolve(result) },
      (err) => {console.log(err)}
      )
  })
}

module.exports.getListWithSlider = function (query, start, limit, sort, reverse, sliderSort) {
  return new Promise ((resolve, reject) => {
      Movie.find({'title': { $regex: query, $options: 'i'}, [sliderSort.field]: {$gte: sliderSort.from, $lte: sliderSort.to } })
      .skip(start).limit(limit).sort({[sort]: [reverse]})
      .lean()
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
    Movie.findOneAndUpdate({'imdbId': id}, data)
    .then(function(result){ resolve() },
    err => { console.log(err) })
  })
}

module.exports.addComment = function (id, data) {
  return new Promise ((resolve, reject) => {
    Movie.findOneAndUpdate({'imdbId': id}, {$push: {comments: data}})
    .then(function(result){ resolve() },
    (err) => {console.log(err)}
    )
  })
}

module.exports.deleteComment = function (movieId, commentId) {
  return new Promise ((resolve, reject) => {
    Movie.findOneAndUpdate({ 'imdbId': movieId}, { $pull: { comments: { _id: commentId } }}).then(done => {
      Movie.findOne({ imdbId: movieId }).then(movie => {
        resolve(movie.comments)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

module.exports.getComment = function (movieId, commentId) {
  return new Promise ((resolve, reject) => {
    Movie.findOne({ imdbId: movieId }).then(movie => {
      resolve(movie.comments.id(commentId))
    }).catch(error => reject(error))
  })
}

module.exports.getMovieOnServer = function (expireDate) {
  return new Promise ((resolve, reject) => {
    Movie.find({movieOnServer: true, lastSeen: { $lt: expireDate }}).then(movie => {
      resolve(movie)
    }).catch(error => reject(error))
  })
}
