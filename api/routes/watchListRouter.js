const express = require('express');
const watchListRouter = express.Router();
const axios = require('axios');
const tokenManager = require('../utils/token');

const MovieManager = require('../models/movieManager');
const UserManager = require('../models/userManager');

watchListRouter
  .post('/add' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      console.log('add')
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/delete' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
    console.log('delete')
    }).catch(err => { res.status(400).json({ error: 'token.invalidToken' })})
  })
  .get('/getList' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      console.log('get list')
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })

module.exports = watchListRouter;
