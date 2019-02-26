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
    // console.log('An error occured while getting download size.');
    // console.log(e);
    reject();
  });
}

function pipeVideo(stream, writeStream, file, id) {
  return new Promise(async (resolve, reject) => {
    stream.pipe(writeStream);
    setInterval(async function() {
      let downloadSize = await getFileSizeInBytes(`assets/torrents/${file.name}`);
      // console.log(`Downloaded: ${Math.round(downloadSize / file.length * 100.00)} % of ${file.name} or ${Math.round(downloadSize / 1000000.0)} mb)`);
      // if a movie is fully downloaded
      if (downloadSize && downloadSize === file.length) {
        const data = {
          lastSeen: Date.now(),
          movieOnServer: true,
          file: `./assets/torrents/${file.name}`,
        };
        MovieManager.update(id, data);
        stream.emit("end");
        resolve();
      }
    }, 5000);
    clearInterval();
    stream.on('error', () => {
      // console.log('An error occured in the pipeVideo function.');
      reject();
    });
  });
}

module.exports.downloadMovie = (file, id) => {
  return new Promise((resolve) => {
    const stream = file.createReadStream();
    const writeStream = fs.createWriteStream(`${path.resolve(__dirname, '../assets/torrents/')}/${file.name}`);
    pipeVideo(stream, writeStream, file, id);
    resolve();
  }).catch((e) => {
    console.log('Woops... There was a problem with the provided torrent !');
    console.log(e);
  });
};

module.exports.getFileSizeInBytes = getFileSizeInBytes;