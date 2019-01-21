const express = require('express');
const commentsRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

commentsRouter
  .post('/add' , function(req, res) {

  })
  .post('/delete' , function(req, res) {

  })

module.exports = commentsRouter;
