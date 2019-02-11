const fs = require('file-system');

function deleteMovie() {
  // Mettre le bon path et faire un check en db des films a supprimer
  // avant d'appeller la fonction
  fs.unlink('assets/torrents/musique.mp4', callback => {
    console.log('done')
  })
}

module.exports.deleteMovie = deleteMovie;
