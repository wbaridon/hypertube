const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

movieRouter
  .get('/testAxios' , function(req, res) {
  axios.get('https://tv-v2.api-fetch.website/movies/1?sort=last%20added&order=-1')
  .then(response => {
    var movie ={
      imdbId: response.data[0].imdb_id,
      title: response.data[0].title,
      year: response.data[0].year
    }
    MovieManager.exist(movie.imdbId).then(status => {
      if (!status) {
        MovieManager.createMovie(movie).then(reply => {
              res.send(response.data[0]);
              console.log('existe now')
        })
      } else {
        console.log('existe')
        res.send(response.data[0]);
      }
    })
  }).catch(error => { console.log(error); })
});



module.exports = movieRouter;
