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

    let subtitles = { }
    if (!fs.existsSync('./assets/subtitles')) { fs.mkdirSync('./assets/subtitles'); }
    initStatus(id, 'en').then(english => {
      subtitles.en = english
      initStatus(id, 'fr').then(french => {
        subtitles.fr = french
        var englishSub = searchSubtitle(id, 'eng')
        var frenchSub = searchSubtitle(id, 'fre')
        if (english === true && french === true) { resolve(subtitles) }
        else {
          Promise.all([englishSub, frenchSub]).then(data => {
            if (!data[0]) { subtitles.en = false }
            if (!data[1]) { subtitles.fr = false }
            resolve(subtitles)
          }).catch(error => { resolve(subtitles) })
        }
      })
    })
  })
}

function initStatus(id, lang) {
  return new Promise ((resolve, reject) => {
    if (!fs.existsSync('./assets/subtitles/'+id+'-'+lang+'.vtt')) { resolve(false) }
    else { resolve(true) }
  })
}

function searchSubtitle(imdbId, lang) {
  return new Promise ((resolve, reject) => {
    if (!fs.existsSync('./assets/subtitles/'+imdbId+'-'+lang+'.vtt')) {
      OpenSubtitles.search({
        sublanguageid: lang,
        extensions: ['srt', 'vtt'],
        imdbid: imdbId,
      }).then(subtitles => {
        switch (lang) {
          case 'fre':
            if (subtitles.fr && subtitles.fr.vtt) {
              download(subtitles.fr.vtt, imdbId, 'fr', '.vtt').then(done => {resolve(true)})
              .catch(err => {
                if (subtitles.fr.utf8) {
                  convert(subtitles.fr.utf8, imdbId, 'fr', '.srt').then(done => { resolve(true)}).catch(err => reject('Subtitle.EnNotAvailable'))
                } else {
                reject('Subtitle.ToolNotAvailable') }
              })
            }
            break;
          case 'eng':
            if (subtitles.en && subtitles.en.vtt) {
              download(subtitles.en.vtt, imdbId, 'en', '.vtt').then(done => resolve(true))
              .catch(err => {
                if (subtitles.en.utf8) {
                  convert(subtitles.en.utf8, imdbId, 'en', '.srt').then(done => resolve(true)).catch(err => reject('Subtitle.EnNotAvailable'))
                } else { reject('Subtitle.ToolNotAvailable') }
              })
            } else { reject('Subtitle.ToolNotAvailable') }
            break;
        }
      }).catch(err => { reject('Subtitle.ToolNotAvailable')})
    } else { resolve(true) }
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
