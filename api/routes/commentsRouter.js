const express = require('express');
const commentsRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

commentsRouter
  .post('/add' , function(req, res) {
    console.log("bananier");
    return ('ok');
  })
  .post('/delete' , function(req, res) {
    console.log("wakanda");
    return ("oui");
  })

module.exports = commentsRouter;
