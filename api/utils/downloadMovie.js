const fs = require('fs');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

const TorrentManager = require('../models/torrentManager');

function pipeVideo(stream, writeStream) {
  return new Promise((resolve, reject) => {
    stream.pipe(writeStream);
    stream.on('error', () => {
      reject();
    });
    stream.on('pipe', () => {
      console.log('Download in progress');
    });
    stream.on('finish', () => {
      resolve();
    });
  });
}

module.exports.downloadMovie = async (file) => {
  return new Promise((resolve) => {
    console.log('Background download has stated...');
    const stream = file.createReadStream();
    console.log(__dirname)
    const writeStream = fs.createWriteStream(`${path.resolve(__dirname, '../assets/torrents/')}/${file.name}`);
    pipeVideo(stream, writeStream);
    resolve();
  }).catch((e) => {
    console.log('Woops... There was a problem with the provided torrent !');
    console.log(e);
  });
};
