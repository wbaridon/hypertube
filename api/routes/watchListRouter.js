const express = require('express');
const watchListRouter = express.Router();
const axios = require('axios');
const tokenManager = require('../utils/token');

const MovieManager = require('../models/movieManager');
const UserManager = require('../models/userManager');

watchListRouter
  .post('/add' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      let movieId = req.body.movieId
      UserManager.addToList(user, {id: movieId})
        .then(result => { res.status(200).send(result) })
        .catch(error => { res.status(400).send({error: 'addToList.Error'})})
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/delete' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      let movieId = req.body.movieId
      UserManager.removeFromList(user, movieId)
        .then(result => { res.status(200).send(result) })
        .catch(error => { res.status(400).send({error: 'removeFromList.Error'})})
    }).catch(err => { res.status(400).json({ error: 'token.invalidToken' })})
  })
  .get('/getList' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      UserManager.getWatchList(user)
        .then(result => { res.status(200).send(result) })
        .catch(error => { res.status(400).send({error: 'getList.Error'})})
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })

module.exports = watchListRouter;
