const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

const MovieManager = require('../models/movieManager');

movieRouter
  .get('/testAxios' , function(req, res) {
      YtsPageCount().then(pages => {

      //  checkPage(1);
      /*  for (var i = 0; i < pages; i++) {
          //checkPage(i);
          setInterval(test, 60)
        }*/
        getNewMovies();
      },
        error => { console.log('Nombre de page inconnue');
      })
      res.send('Fonction lance avec success')
    /*console.log(response.data.data.movies[0])
    console.log(movie.torrents.url)
    MovieManager.exist(movie.imdbId).then(status => {*/

    })
function test() {
  console.log('execute +1')
}
function YtsPageCount() {
  return new Promise ((resolve, reject) => {
    axios.get('https://yts.am/api/v2/list_movies.json?limit=50&order_by=desc&page=1')
    .then(response => {
      resolve(Math.ceil(response.data.data.movie_count / response.data.data.limit));
    }).catch(error => reject(error));
  });
}

function checkPage(page) {
  return new Promise ((resolve, reject) => {
    axios.get('https://yts.am/api/v2/list_movies.json?limit=50&order_by=desc&page='+page)
    .then(response => {
      for (var i = 0; i < response.data.data.movies.length; i++) {
        checkMovie(response.data.data.movies[i])
      }
      resolve();
    })
  })
}
function checkMovie(data) {
  MovieManager.exist(data.imdb_code)
  .then(status => {
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

    })

}

function getPage(page) {
  return new Promise (resolve => {
    axios.get('https://yts.am/api/v2/list_movies.json?limit=50&order_by=desc&page='+page)
    .then(response => {
      for (var i = 0; i < response.data.data.movies.length; i++) {
        checkMovie(response.data.data.movies[i]);
      }
      setTimeout(resolve, 1500)
    })
  })
}

async function getAllPages(pages) {
  for (var i = 1; i <= pages; i++) {
    console.log('YTS Check Page '+ i)
    await getPage(i);
  }
}
function getNewMovies() {
  YtsPageCount().then(pages => {
    getAllPages(pages);
  })
}
module.exports = movieRouter;
