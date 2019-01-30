const axios = require('axios');
const cheerio = require('cheerio');

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

function extraData(id) {
  return new Promise ((resolve, reject) => {
    let url = `https://www.imdb.com/title/${id}/`;
    axios.get(url).then(response => {
      const $ = cheerio.load(response.data);
      const extra = {
        title: $('.title_wrapper').find('h1').text().trim().split('(')[0],
        rating: $('.ratingValue').find('span').text().trim().split('/')[0],
        poster: $('.poster').find('img').attr('src'),
        director: $('.credit_summary_item').find('a').first().text(),
        writer: $('.credit_summary_item').find('a').eq(1).text(),
        stars: $('.credit_summary_item').eq(2).find('a').append(",").text().split(',',3),
        summary: $('.summary_text').text().trim(),
        runtime: $('#titleDetails').find('time').text(),
      //  genre: $('#titleStoryLine').find('div').eq(2).find('a').text().trim().split(' ')

      }
      resolve(extra);
    }).catch(error => reject(error))
  })
}

function addMovie(data) {
  extraData(data.imdb_code).then(extra => {
    let movie = {
      imdbId: data.imdb_code,
      title: extra.title,
      imdbRating: extra.rating,
      director: extra.director,
      runtime: extra.runtime,
      actors: extra.stars,
    //  genre: extra.genre,
      writer: extra.writer,
      year: data.year,
      cover: extra.poster,
      synopsis: extra.summary,
      seeds: data.torrents[0].seeds,
      torrents: {
        language: data.language,
        hash: data.torrents[0].hash,
        quality: data.torrents[0].quality,
        seeds: data.torrents[0].seeds,
        peers: data.torrents[0].peers
      }
    }

   MovieManager.createMovie(movie).then(created => {
  })
  }).catch(error => console.log(error))
}

function getPage(page) {
  return new Promise ((resolve, reject) => { /* remettre limite a 50 */
    axios.get('https://yts.am/api/v2/list_movies.json?limit=50&order_by=desc&page='+page)
    .then(response => {
      for (var i = 0; i < response.data.data.movies.length; i++) {
        checkMovie(response.data.data.movies[i]);
      }
      setTimeout(resolve, 2500)
    }).catch(error => {
      console.log(error);
      reject(error);
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
