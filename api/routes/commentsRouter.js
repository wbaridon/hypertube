const express = require('express');
const commentsRouter = express.Router();
const axios = require('axios');
const tokenManager = require('../utils/token');

const MovieManager = require('../models/movieManager');

commentsRouter
  .post('/add' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      console.log("bananier");
      // Besoin de l'imdbId, username et comment ... En back on setup le timestamp
      res.status(200).send('A faire')
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/delete' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      console.log("wakanda");
      // Besoin de l'imdbId, username et comment ... En back on setup le timestamp
      res.status(200).send('A faire')
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })

module.exports = commentsRouter;
