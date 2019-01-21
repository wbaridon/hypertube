const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

movieRouter
  .post('/testGetMovie', function (req, res) => {
    if (req.body === 42) {
      res.send({
        movie: {
          title: 'asdfg',
          description: 'sdgkldfgj',
        },
      })
    } else (res.status(404).send({'error':'error'})) 
  })
  .post('/getMovies' , function(req, res) {
    getMoreData(req.body.id)
  })
// Check si on peut recuperer des infos en + avant de l'envoyer en front
// Obliger de le mettre ici car nous sommes limite a 1 000 requetes / jour

function getMoreData(id) {
  return new Promise ((resolve, reject) => {
    axios.get('http://www.omdbapi.com/?i='+id+'&apikey=c0120222')
    .then(response => {
    //  console.log(data)
      var data = response.data
      console.log(response.data)
      let movie = {
        public: data.Rated,
        runtime: data.Runtime,
        genre: data.Genre,
        director: data.Director,
        writer: data.Writer,
        actors: data.Actors,
        awards: data.Awards,
        cover: data.Poster,
        imdbRating: data.imdbRating
      }
      console.log(movie)
      MovieManager.update(id, movie)
      // Voir comment faire l'update dans la database
    })
  })
}
module.exports = movieRouter;
