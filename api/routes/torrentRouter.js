const express = require('express');
const torrentRouter = express.Router();
const torrentStream = require('torrent-stream');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const mimeTypes = require('../utils/mimeTypes.js');

function getExtention(fileName) {
  return fileName.substring(fileName.lastIndexOf('.'));
}

function getMagnet(hash) {
  const magnet = 'magnet:?xt=urn:btih:';
  return magnet.concat(hash);
}

function isVideo(mime) {
  return mimeTypes[mime] !== undefined ? true : false;
}

torrentRouter
  .get('/', async (req, res) => {
  let file;
  // Create magnet from hash
  const torrent_magnet = getMagnet(req.query.videoHash);
  // Using torrent_stream
  var engine = torrentStream(torrent_magnet);
  engine.on('ready', function() {
    // Iterates for each file linked in torrent
    engine.files.forEach((current) => {
      let mime = getExtention(current.name);
      if (!isVideo(mime)) {
        console.log(mime + ' is not a valid movie file extention');
        return;
      } else if (file && current.length < file.length) {
        return;
      } else {
        file = current;
      }
    });
    if (!file) {
      engine.removeAllListeners();
      engine.destroy();
      reject(new Error('No video found on this torrent'));
    }

    file.select();
    console.log('filename:', file.name)
    var stream = file.createReadStream()

    const converter = ffmpeg()
      .input(stream)
      .outputOptions('-movflags frag_keyframe+empty_moov')
     .outputFormat('mp4')
      .output(res)
      .on('codecData', (codecData) => {
         console.log('fluent-ffmpeg Notice: CodecData:', codecData);
      })
      .on('start', (cmd) => { console.log('fluent-ffmpeg Notice: Started:', cmd); })
       .on('progress', (progress) => { console.log('fluent-ffmpeg Notice: Progress:', progress.timemark, 'converted'); })
      .on('error', (err, stdout, stderr) => {
         console.log('ffmpeg, file:', file.path, ' Error:', '\nErr:', err, '\nStdOut:', stdout, '\nStdErr:', stderr);
      });

      console.log(getExtention(file.name).substr(1));

    converter.inputFormat(getExtention(file.name).substr(1))
    .audioCodec('aac')
    .videoCodec('libx264')
    .run();

  });
})

module.exports = torrentRouter;
