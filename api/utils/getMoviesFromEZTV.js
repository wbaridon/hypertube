const axios = require('axios');

const MovieManager = require('../models/movieManager');

function getNewMovies() {
  EztvPageCount().then(pages => {
    getAllPages(pages);
  })
}

function EztvPageCount() {
  return new Promise ((resolve, reject) => {
    axios.get('https://eztv.io/api/get-torrents?limit=100')
    .then(response => {
      resolve(Math.ceil(response.data.torrents_count  / response.data.limit));
    }).catch(error => reject(error));
  });
}

function checkMovie(data) {
  MovieManager.exist(data.imdb_id)
  .then(status => {
    if (!status) { addMovie(data) }
  })
}

function getCover(cover) {
  return new Promise ((resolve, reject) => {
    if (cover.match('^http:')) {
      resolve(cover);
    } else {
      resolve('http:'+cover);
    }
  })
}

function addMovie(data) {
  getCover(data.large_screenshot).then(coverChecked => {
    let movie = {
      imdbId: 'tt'+data.imdb_id,
      title: data.title,
      season: data.season,
      episode: data.episode,
      cover: coverChecked,
      dateReleased: data.date_released_unix,
    }
    torrent = {
      hash: data.hash,
      seeds: data.seeds,
      peers: data.peers
    }
    MovieManager.createMovie(movie, torrent).then(created => {
      getBetterCover(movie.imdbId)
    })
  })
}

function getBetterCover(id) { // 40 requetes toutes les 10 s voir comment faire
  let base = 'http://image.tmdb.org/t/p/w500/';
  let api = 'https://api.themoviedb.org/3/find/';
  let apiParams = '?api_key=d0fcf53a22127ce854d40a537f09af25&language=en-US&external_source=imdb_id';
  axios.get(`${api}${id}${apiParams}`).then(coverResult => {
    if (coverResult.data && coverResult.data.tv_results && coverResult.data.tv_results[0] && coverResult.data.tv_results[0].poster_path) {
      movie = {
        cover: base + coverResult.data.tv_results[0].poster_path
      }
      MovieManager.update(id, movie).then(result => {
      })
    }
  })
}

function getPage(page) {
  return new Promise (resolve => {
    axios.get('https://eztv.io/api/get-torrents?limit=5&page='+page)
    .then(response => {
      for (var i = 0; i < response.data.torrents.length; i++) {
        checkMovie(response.data.torrents[i]);
      }
      setTimeout(resolve, 1500)
    })
  })
}

async function getAllPages(pages) {
  for (var i = 1; i <= pages; i++) {
  //  console.log('EZTV Check Page '+ i)
    await getPage(i);
  }
}
function getNewMovies() {
  EztvPageCount().then(pages => {
    getAllPages(pages);
  })
}
module.exports.launcher = getNewMovies;
