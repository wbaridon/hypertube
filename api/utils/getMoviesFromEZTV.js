const axios = require('axios');
const cheerio = require('cheerio');

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
  MovieManager.exist(`tt${data.imdb_id}`)
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

function extraData(id) {
  return new Promise ((resolve, reject) => {
    let url = `https://www.imdb.com/title/tt${id}/`;
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
    }).catch(error => { reject(error) })
  })
}


function addMovie(data) {
  if(data.imdb_id) {
    extraData(data.imdb_id).then(extra => {
      if (!extra.poster) {
        extra.poster = 'https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg'
      }
      let movie = {
        imdbId: 'tt'+data.imdb_id,
        title: data.title,
        season: data.season,
        episode: data.episode,
        rating: extra.rating,
      //  genre: extra.genre,
        director: extra.director,
        runtime: extra.runtime,
        writer: extra.writer,
        synopsis: extra.summary,
        cover: extra.poster,
        dateReleased: data.date_released_unix,
        seeds: data.seeds,
        torrents: {
          hash: data.hash,
          seeds: data.seeds,
          peers: data.peers
        }
      }
      MovieManager.createMovie(movie).then(created => {
         getBetterCover(movie.imdbId)
      })
    }).catch(error => { console.log(error) })
  }
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

function getPage(page) {
  return new Promise ((resolve, reject) => {
    // limit 5
    axios.get('https://eztv.io/api/get-torrents?limit=5&page='+page)
    .then(response => {
      for (var i = 0; i < response.data.torrents.length; i++) {
        checkMovie(response.data.torrents[i]);
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
