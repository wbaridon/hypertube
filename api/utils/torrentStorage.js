const fs = require('file-system');
const moment = require('moment');

const MovieManager = require('../models/movieManager');

function deleteMovie() {
  let lastMonth = moment().subtract(1, 'months')
  MovieManager.getMovieOnServer(lastMonth.format('X'))
  .then(result => {
    for (var i = 0; i < result.length; i++) {
      movieToDelete(result[i].file, result[i].imdbId)
    }
  }).catch(err => console.log(err))
}

function movieToDelete(path, imdbId) {
  console.log(path)
  if (path) {
    fs.unlink(path, callback => {
      let data = {
        file: '',
        movieOnServer: false,
      }
      MovieManager.update(imdbId, data).then(result => {
      }).catch(err => console.log(err))
    })
  }
}
module.exports.deleteMovie = deleteMovie;
