const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

movieRouter
  .get('/testAxios' , function(req, res) {
      YtsPageCount().then(pages => {
        axios.get('https://yts.am/api/v2/list_movies.json?page=1')
        .then(response => {
          for (var i = 0; i < response.data.data.movies.length; i++) {
            checkMovie(response.data.data.movies[i])
            console.log(i)
          }
        })
      })

    /*console.log(response.data.data.movies[0])
    console.log(movie.torrents.url)
    MovieManager.exist(movie.imdbId).then(status => {*/

    })

function YtsPageCount() {
  return new Promise ((resolve, reject) => {
    axios.get('https://yts.am/api/v2/list_movies.json?page=1')
    .then(response => {
      resolve(Math.ceil(response.data.data.movie_count / response.data.data.limit));
    }).catch(error => reject(error));
  });
}

function checkMovie(data) {
  MovieManager.exist(data.imdb_code)
  .then(status => {
    console.log('Statut: ' + status)
    if (!status) { addMovie(data) }
  })
}

function addMovie(data) {

    let movie = {
      imdbId: data.imdb_code,
      title: data.title,
      year: data.year,
      cover: data.large_cover_image,
      synopsis: data.synopsis,
      torrents: {
      }
    }
    MovieManager.createMovie(movie).then(created => {
      console.log('+1 movie created')
    })

}

module.exports = movieRouter;
