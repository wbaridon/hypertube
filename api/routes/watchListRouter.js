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
      let movieId = req.body.idMovie
      UserManager.removeFromList(user, movieId)
        .then(result => {
          let user = token.user
          UserManager.getWatchList(user)
            .then(result => {
              getMovieList(result, user, callback => {
                res.status(200).send(callback)
              })
            })
            .catch(error => { res.status(400).send({error: 'getList.Error'})})
        })
        .catch(error => { res.status(400).send({error: 'removeFromList.Error'})})
    }).catch(err => { res.status(400).json({ error: 'token.invalidToken' })})
  })
  .get('/getList' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      UserManager.getWatchList(user)
        .then(result => {
          getMovieList(result, user, callback => {
            res.status(200).send(callback)
          })
         })
        .catch(error => { res.status(400).send({error: 'getList.Error'})})
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })

async function getMovieList(data, user, callback) {
  let array = []
  for (var i = 0; i < data.length; i++) {
    array[i] = await getTheMovie(data[i].id, user)
  }
  callback(array)
}

function getTheMovie(id, user) {
  return new Promise ((resolve, reject) => {
    MovieManager.getMovie(id).then(result => {
      UserManager.getSeenStatus(user, result.imdbId).then(history => {
        const myMovie = result.toObject();
        if (history) { myMovie.seen = true }
        else { myMovie.seen = false }
        resolve(myMovie);
      }).catch(err => rehect('getSeenStatus.notAvailable'))
    }).catch(error => reject('errorInTheDb'))
  })
}
module.exports = watchListRouter;
