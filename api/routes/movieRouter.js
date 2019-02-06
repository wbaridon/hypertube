const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

movieRouter
  .post('/getMovie' , function(req, res) {
      MovieManager.getMovie(req.body.id).then(result => {
        res.status(200).send(result);
      }).catch(error => res.status(404).send({error:'errorInTheDb'}))
  })
  .post('/list', function(req,res) {
    let filter = req.body.filter;
    let limit = (filter.to - filter.from);
    let sort = 'seeds'
    var reverse = -1;
    if (req.body.filter.reverse) {
      reverse = 1;
    }
    // Manque le sort et le reverse -1 ou 1
    /*limit = 5;
    start = 0;
    const filter = { searchString: 'The' }*/
    MovieManager.getList(filter.searchString, filter.from, limit, sort, reverse).then(result => {
      res.status(200).send(result)
    })
  })

module.exports = movieRouter;
