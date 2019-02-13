const axios = require('axios');
const cheerio = require('cheerio');

const MovieManager = require('../models/movieManager');

function getNewMovies() {
  EztvPageCount().then(pages => {
    getAllPages(pages);
  }).catch(error => console.log(error))
}

function EztvPageCount() {
  return new Promise ((resolve, reject) => {
    axios.get('https://eztv.io/api/get-torrents?limit=5')
    .then(response => {
      resolve(Math.ceil(response.data.torrents_count  / response.data.limit));
    }).catch(error => reject('EztvPageCount.serviceUnaivailable'));
  });
}

async function getAllPages(pages) {
  for (var i = 1; i <= pages; i++) {
      try {
        await getPage(i);
      } catch(e) {
        console.log('Eztv.serviceUnaivailable')
      }
  }
}

function getPage(page) {
  return new Promise ((resolve, reject) => {
    axios.get('https://eztv.io/api/get-torrents?limit=5&page='+page)
    .then(response => {
      for (var i = 0; i < response.data.torrents.length; i++) {
        checkMovie(response.data.torrents[i]);
      }
      setTimeout(resolve, 3000)
    }).catch(error => { reject(error); })
  })
}

function checkMovie(data) {
  MovieManager.exist(`tt${data.imdb_id}`)
  .then(status => {
    if (!status) { formatMovieData(data) }
    else { updateMovie(data) }
  })
}

function updateMovie(data) {
  if (data.imdb_id) {
    let movie = {
      seeds: data.seeds,
      torrents: {
        hash: data.hash,
        seeds: data.seeds,
        peers: data.peers
      }
    }
    MovieManager.update('tt'+data.imdb_id, movie)
    .then(update => { }).catch(err => console.log('eztv.updateImpossible'))
  }
}


function formatMovieData(data) {
  if (data.imdb_id) {
    let movie = {
      type: 'serie',
      imdbId: 'tt'+data.imdb_id,
      title: data.title,
      season: data.season,
      episode: data.episode,
      dateReleased: data.date_released_unix,
      seeds: data.seeds,
      torrents: {
        language: 'English',
        hash: data.hash,
        seeds: data.seeds,
        peers: data.peers
      }
    }
    getExtraData(movie)
  }
}

function checkCover(url) {
  return new Promise ((resolve, reject) => {
    axios.get(url)
    .then(cover => {
      if (cover.status == 200) { resolve('cover.Exist'); }
    }, error => { reject('cover.notFound') })
  })
}

function getExtraData(movie) {
 let url = `https://www.imdb.com/title/${movie.imdbId}/`;
  axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        movie.title = $('.title_wrapper').find('h1').text().split('(')[0].trim();
        movie.rating = $('.ratingValue').find('span').text().split('/')[0].trim();
        movie.cover = $('.poster').find('img').attr('src');
        movie.synopsis = $('.summary_text').text().trim();
        movie.runtime = $('#titleDetails').find('time').text().split(' ')[0].trim();
        if (!movie.cover) { movie.cover = 'https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg' }
       addMovie(movie)
  }).catch(error => console.log('EZTV.getExtraData.getExtraDataUnaivailable'))
}

function addMovie(movie) {
  MovieManager.createMovie(movie)
  .then(success => {  getBetterCover(movie.imdbId) }, error => { console.log(error)})
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
      if (coverResult.data.tv_results[0].poster_path) {
        MovieManager.update(id, movie).then(result => {
        })
      }
    }
  }).catch(error => console.log(error))
}

module.exports.launcher = getNewMovies;
