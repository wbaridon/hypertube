const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

movieRouter
  .post('/testGetMovie', function (req, res) {
    if (req.body === 42) {
      res.send({
        movie: {
          title: 'asdfg',
          description: 'sdgkldfgj',
        },
      })
    } else (res.status(404).send({'error':'error'}))
  })
  .post('/getMovie' , function(req, res) {
  //  getMoreData(req.body.id)
  res.send('prochainement');
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
