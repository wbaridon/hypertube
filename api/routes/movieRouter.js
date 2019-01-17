const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

movieRouter
  .post('/getMovies' , function(req, res) {

    })

module.exports = movieRouter;
