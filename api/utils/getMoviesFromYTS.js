const axios = require('axios');

const MovieManager = require('../models/movieManager');

function getNewMovies() {
  YtsPageCount().then(pages => {
    getAllPages(pages);
  })
}

function YtsPageCount() {
  return new Promise ((resolve, reject) => {
    axios.get('https://yts.am/api/v2/list_movies.json?limit=50&order_by=desc&page=1')
    .then(response => {
      resolve(Math.ceil(response.data.data.movie_count / response.data.data.limit));
    }).catch(error => reject(error));
  });
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
      seeds: data.torrents[0].seeds
    }
    torrent = {
      language: data.language,
      hash: data.torrents[0].hash,
      quality: data.torrents[0].quality,
      seeds: data.torrents[0].seeds,
      peers: data.torrents[0].peers
    }

    MovieManager.createMovie(movie, torrent).then(created => {

    })

}

function getPage(page) {
  return new Promise (resolve => {
    axios.get('https://yts.am/api/v2/list_movies.json?limit=50&order_by=desc&page='+page)
    .then(response => {
      for (var i = 0; i < response.data.data.movies.length; i++) {
        checkMovie(response.data.data.movies[i]);
      }
      setTimeout(resolve, 2500)
    })
  })
}

async function getAllPages(pages) {
  for (var i = 1; i <= pages; i++) {
  //  console.log('YTS Check Page '+ i)
    await getPage(i);
  }
}
function getNewMovies() {
  YtsPageCount().then(pages => {
    getAllPages(pages);
  })
}
module.exports.launcher = getNewMovies;
