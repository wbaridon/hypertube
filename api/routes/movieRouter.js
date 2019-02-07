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
          console.log(history)
        }).catch(err => console.log(err))
        res.status(200).send(result);
      }).catch(error => res.status(404).send({error:'errorInTheDb'}))
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/list', function(req,res) {
    let filter = req.body.filter;
    let limit = (filter.to - filter.from);
    let sort = 'seeds'
    var reverse = -1;
    if (req.body.filter.reverse) {
      reverse = 1;
    }
    // Manque le sort et
    /* const filter = { searchString: 'The' }*/
    MovieManager.getList(filter.searchString, filter.from, limit, sort, reverse).then(result => {
      res.status(200).send(result)
    })
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
        .catch(error => { res.status(400).send({error: 'movieUnSeen.Error'})})
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })

module.exports = movieRouter;
