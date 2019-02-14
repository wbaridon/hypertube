const fs = require('fs');
const express = require('express');

const torrentRouter = express.Router();
const torrentStream = require('torrent-stream');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);
const mimeTypes = require('../utils/mimeTypes.js');

const MovieManager = require('../models/movieManager');

function getExtention(fileName) {
  return fileName.substring(fileName.lastIndexOf('.'));
}

function getMagnet(hash) {
  const magnet = 'magnet:?xt=urn:btih:';
  console.log(magnet.concat(hash));
  return magnet.concat(hash);
}

function isVideo(mime) {
  return mimeTypes[mime] !== undefined;
}

function findVideoFile(engine) {
  let file;
  engine.files.forEach((current) => {
    const mime = getExtention(current.name);
    if (!isVideo(mime)) {
      return;
    }
    if (file && current.length < file.length) {
      return;
    }
    file = current;
  });
  return file;
}

function alreadyDownloaded(hash, id, file) {
  if (fs.existsSync(`assets/torrents/${file.name}`)) {
    console.log('Movie already exists');
    const data = { lastSeen: Date.now() };
    MovieManager.update(id, data);
    return true;
  }

  const data = {
    lastSeen: Date.now(),
    movieOnServer: true,
    file: `assets/torrents/${file.name}`,
  };
  MovieManager.update(id, data);
  return false;
}

torrentRouter
  .get('/', async (req, res) => {
    const {
      videoHash,
      id,
    } = req.query;
    const hash = videoHash;
    console.log(hash)
    let downloaded = false;
    const torrentMagnet = getMagnet(hash);
    const engine = torrentStream(torrentMagnet, {
      // Trouver un repertoire tmp qui bug pas
      tmp: './assets/tmp',

    })

    engine.on('ready', () => {
      const file = findVideoFile(engine);
      if (!file) {
        engine.removeAllListeners();
        engine.destroy();
        return res.send({ err: 'No video found on this torrent' });
      }

      file.select();

      let stream = null;
      if (alreadyDownloaded(hash, id, file) === true) {
        downloaded = true;
        stream = fs.createReadStream(`assets/torrents/${file.name}`);
      } else {
        stream = file.createReadStream();
      }
      const converter = ffmpeg()
        .input(stream)
        .outputOptions('-movflags frag_keyframe+empty_moov')
        .outputFormat('mp4')
        .output(res)
        .on('codecData', (codecData) => {
          console.log('fluent-ffmpeg: CodecData:', codecData);
        })
        .on('start', (cmd) => { console.log('fluent-ffmpeg: Started:', cmd); })
        .on('progress', (progress) => { console.log('fluent-ffmpeg: Progress:', progress.timemark, 'converted'); })
        .on('end', () => {
          console.log('Finished processing');
        })
        .on('error', (err, stdout, stderr) => {
          console.log('ffmpeg, file:', file.path, ' Error:', '\nErr:', err, '\nStdOut:', stdout, '\nStdErr:', stderr);
        });

      converter.inputFormat(getExtention(file.name).substr(1))
        .audioCodec('aac')
        .videoCodec('libx264')
        .run();

      let writeStream = null;
      if (!downloaded) {
        writeStream = fs.createWriteStream(`assets/torrents/${file.name}`);
        stream.pipe(writeStream);
      }
      res.pipe(converter);

      res.on('close', () => {
        console.log('page closes, all processes killed');
        converter.kill();
        stream.destroy();
        if (!downloaded) {
          writeStream.destroy();
        }
      });
      return null;
    });
  });
module.exports = torrentRouter;
