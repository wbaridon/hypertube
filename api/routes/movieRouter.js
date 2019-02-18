const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');
const tokenManager = require('../utils/token');
const getSubtitles = require('../utils/getSubtitles')

const MovieManager = require('../models/movieManager');
const UserManager = require('../models/userManager');

movieRouter
  .post('/getMovie' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
        getMovieData(token.user, req.body.id).then(data => {
          res.status(200).send(data);
        }).catch(err => res.status(400).send({error:'getMovieData.notAvailable'}))
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/getSubtitles' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      subtitles(req.body.imdbId).then(data => {
        res.status(200).send(data);
      }).catch(err => res.status(400).send({error:'getSubtitles.notAvailable'}))
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/list', function(req,res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let filter = req.body.filter;
      let limit = (filter.to - filter.from);
      let sort = 'seeds'
      if (filter.sortBy === 'rating') { sort = 'imdbRating' }
      if (filter.sortBy === 'alphabetical') { sort = 'title' }
      if (filter.sortBy === 'date') { sort = 'year' }
      var reverse = -1;
      if (req.body.filter.reverse) {
        reverse = 1;
      }
      let sliderSort = {
        field: sort,
        from: filter.sortBySliderValues.min,
        to: filter.sortBySliderValues.max,
      }
     if (filter.sortBy === 'popular' || filter.sortBy === 'alphabetical') {
       MovieManager.getList(filter.searchString, filter.from, limit, sort, reverse).then(result => {
         movieInTheUserList(token.user, result, callback => {
           getSeenStatusList(token, callback, ret => {
             res.status(200).send(ret)
           })
         })
       })
     } else {
       MovieManager.getListWithSlider(filter.searchString, filter.from, limit, sort, reverse, sliderSort).then(result => {
         movieInTheUserList(token.user, result, callback => {
           getSeenStatusList(token, callback, ret => {
             res.status(200).send(ret)
           })
         })
       })
     }
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/seen', function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      let movieId = req.body.movieId
      UserManager.movieSeen(user, {id: movieId})
        .then(result => { res.status(200).send({seen: true}) })
        .catch(error => { res.status(400).send({error: 'movieSeen.Error'})})
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/unseen', function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      let movieId = req.body.movieId
      UserManager.movieUnseen(user, movieId)
        .then(result => { res.status(200).send({seen: false}) })
        .catch(error => { res.status(400).send({error: 'movieUnseen.Error'})})
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })

  async function movieInTheUserList(user, movieList, callback) {
    var array = movieList
    for (var i = 0; i < movieList.length; i++) {
      array[i].watchList = await checkUserListForId(movieList[i].imdbId, user)
    }
    callback(array)
  }

  function checkUserListForId(id, user) {
    return new Promise ((resolve, reject) => {
      UserManager.getWatchListbyId(user, id).then(data => {
        if (data) { resolve('true') }
        else { resolve('false') }
      }).catch(err => reject(err))
    })
  }

  async function getSeenStatusList(token, array, callback) {
    var myArray = array
    for (var i = 0; i < array.length; i++) {
      myArray[i] = await getSeenStatusOnJson(token, array[i])
    }
    callback(myArray)
  }

  function getSeenStatus(user, id) {
    return new Promise ((resolve, reject) => {
      UserManager.getSeenStatus(user, id).then(history => {
        resolve(history ? true : false)
      }).catch(err => reject(err))
    })
  }

  function getSeenStatusOnJson(token, data) {
    return new Promise ((resolve, reject) => {
      UserManager.getSeenStatus(token.user, data.imdbId).then(history => {
        const myMovie = data;
        if (history) { myMovie.seen = true }
        else { myMovie.seen = false }
        resolve(myMovie)
      }).catch(err => reject(err))
    })
  }

  function getMovieData(user, imdbId) {
    return new Promise ((resolve, reject) => {
      Promise.all([
        MovieManager.getMovie(imdbId).catch(err => { }),
        getSeenStatus(user, imdbId).catch(err => { }),
      ]).then(data => {
        const movie = data[0].toObject();
        movie.seen = data[1]
        resolve(movie)
      }).catch(err => { reject() } )
    })
  }

  function subtitles(id) {
    return new Promise ((resolve, reject) => {
      getSubtitles.launcher(id).then(data => {
        resolve(data)
      }).catch(err => reject(err))
    })
  }
module.exports = movieRouter;
