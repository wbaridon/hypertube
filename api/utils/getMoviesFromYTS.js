const axios = require('axios');
const cheerio = require('cheerio');

const MovieManager = require('../models/movieManager');

function getNewMovies() {
  YtsPageCount().then(pages => {
    getAllPages(pages);
  }).catch(error => console.log(error))
}

function YtsPageCount() {
  return new Promise ((resolve, reject) => {
    axios.get('https://yts.am/api/v2/list_movies.json?limit=50&order_by=desc&page=1')
    .then(response => {
      resolve(Math.ceil(response.data.data.movie_count / response.data.data.limit));
    }).catch(error => reject('YtsPageCount.serviceUnaivailable'));
  });
}

async function getAllPages(pages) {
  for (var i = 1; i <= pages; i++) {
      await getPage(i);
  }
}

function getPage(page) {
  return new Promise ((resolve, reject) => {
    axios.get('https://yts.am/api/v2/list_movies.json?limit=50&order_by=desc&page='+page)
    .then(response => {
      for (var i = 0; i < response.data.data.movies.length; i++) {
        checkMovie(response.data.data.movies[i]);
      }
      setTimeout(resolve, 2500)
    }).catch(error => { reject(error); })
  })
}

function checkMovie(data) {
  MovieManager.exist(data.imdb_code)
  .then(status => {
    if (!status) { formatMovieData(data) }
  })
}

function formatMovieData(data) {
  let movie = {
    imdbId: data.imdb_code,
    title: data.title,
    year: data.year,
    imdbRating: data.rating,
    genre: data.genres,
    cover: data.large_cover_image,
    seeds: data.torrents[0].seeds,
    torrents: {
      language: data.language,
      hash: data.torrents[0].hash,
      quality: data.torrents[0].quality,
      seeds: data.torrents[0].seeds,
      peers: data.torrents[0].peers
    }
  }
    checkCover(movie.cover)
    .then(coverExist => {
      getExtraData(movie)
    }, coverNotFound => {
      delete movie.cover
      getExtraData(movie)
    })
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
        if (!movie.title) { movie.title = $('.title_wrapper').find('h1').text().split('(')[0].trim(); }
        if (!movie.rating) { movie.rating = $('.ratingValue').find('span').text().split('/')[0].trim(); }
        if (!movie.cover) { movie.cover = $('.poster').find('img').attr('src'); }
        movie.director = $('.credit_summary_item').find('a').first().text();
        movie.writer = $('.credit_summary_item').find('a').eq(1).text();
        movie.actors = $('.credit_summary_item').eq(2).find('a').append(",").text().split(',',3);
        movie.synopsis = $('.summary_text').text().trim();
        movie.runtime = $('#titleDetails').find('time').text().split(' ')[0].trim();
        addMovie(movie)
  }).catch(error => console.log(error + 'getExtraData.getExtraDataUnaivailable'))
}

function addMovie(movie) {
  MovieManager.createMovie(movie)
  .then(success => {  }, error => { console.log(error)})
}

module.exports.launcher = getNewMovies;
