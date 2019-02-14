const axios = require('axios');
const fs = require('fs');
const srt2vtt = require('srt-to-vtt')
const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent', // Add a real useragent at final
    ssl: true
});

function getSubtitles(id) {
  return new Promise ((resolve, reject) => {
    let subtitles = []
      searchSubtitle(id, 'eng').then(done => {
        subtitles.en = true
        searchSubtitle(id, 'fre').then(alsoDone => {
          subtitles.fr = true
          resolve(subtitles)
        }).catch(err => {
          subtitles.fr = false
          resolve(subtitles)
        })
      }).catch(err => {
        subtitles.en = false
        searchSubtitle(id, 'fre').then(alsoDone => {
          subtitles.fr = true
          resolve(subtitles)
        }).catch(err => {
          subtitles.fr = false
          resolve(subtitles)
        })
      })
  })
}

function searchSubtitle(imdbId, lang) {
  return new Promise ((resolve, reject) => {
    OpenSubtitles.search({
      sublanguageid: lang,
      extensions: ['srt', 'vtt'],
      imdbid: imdbId,
    }).then(subtitles => {
      if (subtitles.fr && subtitles.fr.vtt) {
        download(subtitles.fr.vtt, imdbId, 'fr', '.vtt').then(done => {resolve()})
        .catch(err => {
          convert(subtitles.en.utf8, imdbId, 'en', '.srt').then(done => { resolve()}).catch(err => reject('Subtitle.EnNotAvailable'))
        })
      }
      else if (subtitles.en && subtitles.en.vtt) {
        download(subtitles.en.vtt, imdbId, 'en', '.vtt').then(done => resolve())
        .catch(err => {
          convert(subtitles.en.utf8, imdbId, 'en', '.srt').then(done => resolve()).catch(err => reject('Subtitle.EnNotAvailable'))
        })
      } else { reject('Subtitle.ToolNotAvailable') }
    }).catch(err => { reject('Subtitle.ToolNotAvailable')})
  })
}

function download(url, imdbId, lang, extension) {
  return new Promise((resolve, reject) => {
    axios.get(url,{
      responseType: 'stream'
    })
    .then(res => {
      let path = 'assets/subtitles/';
      let filename = imdbId + '-' + lang;
      res.data.pipe(fs.createWriteStream(path + filename + extension))
      resolve()
    }).catch(error => {
      reject('downloadSubtitle.subtitleNotUploaded')})
  })
}

function convert(url, imdbId, lang, extension) {
  return new Promise ((resolve, reject) => {
    axios.get(url,{
      responseType: 'stream'
    })
    .then(res => {
      let path = 'assets/subtitles/';
      let filename = imdbId + '-' + lang;
      var stream = res.data.pipe(fs.createWriteStream(path + filename + extension))
      stream.on('finish', function () {
      var convert = fs.createReadStream(path + filename + extension)
          .pipe(srt2vtt())
          .pipe(fs.createWriteStream(path + filename + '.vtt'))
          convert.on('finish', function () {
            fs.unlink(path + filename + extension, callback => {
                        resolve()
            })
        })
      })
    }).catch(error => {
      reject('downloadSubtitle.subtitleNotUploaded')})
  })
}

module.exports.launcher = getSubtitles;
