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
        UserManager.getSeenStatus(token.user, result.imdbId).then(history => {
          const myMovie = result.toObject();
          if (history) { myMovie.seen = true }
          else { myMovie.seen = false }
          res.status(200).send(myMovie);
        }).catch(err => res.status(404).send({error:'getSeenStatus.notAvailable'}))
      }).catch(error => res.status(404).send({error:'errorInTheDb'}))
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
      MovieManager.getList(filter.searchString, filter.from, limit, sort, reverse).then(result => {
        movieInTheUserList(token.user, result, callback => {
          res.status(200).send(callback)
        })
      })
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/seen', function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      let movieId = req.body.movieId
      UserManager.movieSeen(user, {id: movieId})
        .then(result => { res.status(200).send(result) })
        .catch(error => { res.status(400).send({error: 'movieSeen.Error'})})
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/unseen', function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      let movieId = req.body.movieId
      UserManager.movieUnseen(user, movieId)
        .then(result => { res.status(200).send(result) })
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

module.exports = movieRouter;
