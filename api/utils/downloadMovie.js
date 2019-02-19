const fs = require('fs');
const express = require('express');

const torrentRouter = express.Router();
const torrentStream = require('torrent-stream');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

const TorrentManager = require('../models/torrentManager');

function pipeVideo(stream, writeStream) {
  return new Promise((resolve, reject) => {
    stream.pipe(writeStream);
    stream.on('error', () => {
      reject();
    });
    stream.on('finish', () => {
      resolve();
    });
  });
}

module.exports.downloadMovie = async (file) => {
  return new Promise((resolve) => {
    console.log('Background movie download has stated...');
    const stream = file.createReadStream();
    const writeStream = fs.createWriteStream(`./assets/torrents/${file.name}`);
    pipeVideo(stream, writeStream);
    console.log('Movie downloaded entirely !');
    resolve();
  }).catch((e) => {
    console.log('Woops... There was a problem with the provided torrent magnet !');
    console.log(e);
  });
};