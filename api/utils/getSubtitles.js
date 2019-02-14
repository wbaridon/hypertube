const axios = require('axios');
const fs = require('fs');
const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent', // Add a real useragent at final
    ssl: true
});

function getSubtitles(id) {
  searchSubtitle(id, 'eng')
  searchSubtitle(id, 'fre')
}

function searchSubtitle(imdbId, lang) {
  return new Promise ((resolve, reject) => {
    OpenSubtitles.search({
      sublanguageid: lang,
      extensions: ['srt', 'vtt'],
      imdbid: imdbId,
    }).then(subtitles => {
      if (subtitles.fr && subtitles.fr.vtt) {
        download(subtitles.fr.vtt, imdbId, 'fr').then(done => {}).catch(err => console.log('Subtitle.FrNotAvailable'))
      }
      if (subtitles.en && subtitles.en.vtt) {
        download(subtitles.en.vtt, imdbId, 'en').then(done => {}).catch(err => console.log('Subtitle.EnNotAvailable'))
      }
    })
  })
}

function download(url, imdbId, lang){
  return new Promise((resolve, reject) => {
    axios.get(url,{
      responseType: 'stream'
    })
    .then(res => {
      let path = 'assets/subtitles/';
      let filename = imdbId + '-' + lang;
      let extension = '.vtt'
      res.data.pipe(fs.createWriteStream(path + filename + extension))
      resolve()
    }).catch(error => {
      reject('downloadSubtitle.subtitleNotUploaded')})
  })
}

module.exports.launcher = getSubtitles;
