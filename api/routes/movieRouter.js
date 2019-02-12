const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');
const tokenManager = require('../utils/token');

const MovieManager = require('../models/movieManager');
const UserManager = require('../models/userManager');

movieRouter
  .post('/getMovie' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      MovieManager.getMovie(req.body.id).then(result => {
        getSeenStatus(token, result).then(myMovie => {
          res.status(200).send(myMovie);
        }).catch(err => res.status(404).send({error:'getSeenStatus.notAvailable'}))
      }).catch(error => res.status(404).send({error:'errorInTheDb'}))
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/list', function(req,res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let filter = req.body.filter;
      console.log(filter)
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

  function getSeenStatus(token, data) {
    return new Promise ((resolve, reject) => {
      UserManager.getSeenStatus(token.user, data.imdbId).then(history => {
        const myMovie = data.toObject();
        if (history) { myMovie.seen = true }
        else { myMovie.seen = false }
        resolve(myMovie)
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
module.exports = movieRouter;
