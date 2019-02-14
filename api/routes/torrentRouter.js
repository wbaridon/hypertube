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
  if (fs.existsSync(`./assets/torrents/${file.name}`)) {
    console.log('Movie already exists');
    const data = { lastSeen: Date.now() };
    MovieManager.update(id, data);
    return true;
  }

  const data = {
    lastSeen: Date.now(),
    movieOnServer: true,
    file: `./assets/torrents/${file.name}`,
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
    let crashCounter = 0;
    const hash = videoHash;
    let downloaded = false;
    console.log(crashCounter++);
    const torrentMagnet = getMagnet(hash);
    console.log(crashCounter++);
    const engine = torrentStream(torrentMagnet, {
      // Trouver un repertoire tmp qui bug pas
      tmp: './assets/tmp',
    });
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
        stream = fs.createReadStream(`./assets/torrents/${file.name}`);
    console.log('0', crashCounter++);
  } else {
        stream = file.createReadStream();
    console.log('0', crashCounter++);
  }
    console.log('1', crashCounter++);
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
        console.log('2', crashCounter++);

      converter.inputFormat(getExtention(file.name).substr(1))
        .audioCodec('aac')
        .videoCodec('libx264')
        .run();

      let writeStream = null;
      if (!downloaded) {
        console.log('3', crashCounter++);
        writeStream = fs.createWriteStream(`./assets/torrents/${file.name}`);
        console.log('4', crashCounter++);
        stream.pipe(writeStream);
      }
      console.log('3', crashCounter++);
      res.pipe(converter);
      console.log('4', crashCounter++);

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
