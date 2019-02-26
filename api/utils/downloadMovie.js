const fs = require('fs');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const MovieManager = require('../models/movieManager');

ffmpeg.setFfmpegPath(ffmpegPath);

function getFileSizeInBytes(filename) {
  return new Promise(async (resolve) => {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    resolve(fileSizeInBytes);
  }).catch((e) => {
    console.log('An error occured while getting download size.');
    console.log(e);
    reject();
  });
}

function pipeVideo(stream, writeStream, file) {
  return new Promise(async (resolve, reject) => {
    stream.pipe(writeStream);
    setInterval(async function() {
      let fileSize = await getFileSizeInBytes(`assets/torrents/${file.name}`);
      console.log(`Downloaded: ${Math.round(fileSize / file.length * 100.00)} % of ${file.name} or ${Math.round(fileSize / 1000000.0)} mb)`)
    }, 5000);
    let downloadSize = await getFileSizeInBytes(`assets/torrents/${file.name}`);
    if (downloadSize && downloadSize === file.length) {
      clearInterval();
      console.log(`${file.name} was downloaded entirely`);
      const data = {
        lastSeen: Date.now(),
        movieOnServer: true,
        file: `./assets/torrents/${file.name}`,
      };
      MovieManager.update(id, data);
      resolve();
    }
    stream.on('error', () => {
      console.log('An error occured in the pipeVideo function.');
      reject();
    });
  });
}

module.exports.downloadMovie = (file) => {
  return new Promise((resolve) => {
    console.log('Background download has stated...');
    const stream = file.createReadStream();
    console.log(__dirname)
    const writeStream = fs.createWriteStream(`${path.resolve(__dirname, '../assets/torrents/')}/${file.name}`);
    pipeVideo(stream, writeStream, file);
    resolve();
  }).catch((e) => {
    console.log('Woops... There was a problem with the provided torrent !');
    console.log(e);
  });
};

module.exports.getFileSizeInBytes = getFileSizeInBytes;