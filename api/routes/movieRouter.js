const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

movieRouter
  .post('/getMovie' , function(req, res) {
    console.log("coucou");
    console.log(req.body.id);
    getMoreData(req.body.id).then(done => {
      MovieManager.getMovie(req.body.id).then(result => {
        res.status(200).send(result);
      }).catch(error => res.status(404).send('errorInTheDb'))
    })
  })
  .post('/list', function(req,res) {
    let filter = req.body.filter;
    let limit = (filter.to - filter.from);
    console.log('Limite : '+limit);
    // Manque le sort et le reverse -1 ou 1
    /*limit = 5;
    start = 0;
    const filter = { searchString: 'The' }*/
    MovieManager.getList(filter.searchString, filter.from, limit).then(result => {
      res.status(200).send(result)
    })
  })
// Check si on peut recuperer des infos en + avant de l'envoyer en front
// Obliger de le mettre ici car nous sommes limite a 1 000 requetes / jour

function getMoreData(id) {
  return new Promise ((resolve, reject) => {
    axios.get('http://www.omdbapi.com/?i='+id+'&apikey=c0120222')
    .then(response => {
      var data = response.data
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
      MovieManager.update(id, movie).then(done => resolve()).catch(error => reject(error));
    })
  })
}
module.exports = movieRouter;
