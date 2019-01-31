const express = require('express');
const torrentRouter = express.Router();
const torrentStream = require('torrent-stream');
const ffmpeg = require('fluent-ffmpeg');
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
  .get('/', function(req, res) {
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

    const fileSize = file.length
    // Check if server has something left to return
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      console.log('filename:', file.name)
      console.log(fileSize)
      console.log(parts)
      const startByte = parseInt(parts[0], 10)
      const endByte = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
      const chunksize = (endByte-startByte)+1
      // Create video stream from startByte to endByte
      var stream = file.createReadStream(
        {
          start: startByte,
          end: endByte
        }
      )
      // ffmpeg(stream)
      // // You may pass a pipe() options object when using a stream
      // .outputOptions('-movflags frag_keyframe+empty_moov')
      // .outputFormat('mp4')
      // .output(res)

      const head = {
        'Content-Range': `bytes ${startByte}-${endByte}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head)
      // Pipe what was returned so far
      stream.pipe(res)
    }
    else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(file.path).pipe(res)
    }
  });
})

module.exports = torrentRouter;
