const fs = require('fs');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

const mimeTypes = require('../utils/mimeTypes.js');
const MovieManager = require('../models/movieManager');
const DownloadMovie = require('../utils/downloadMovie.js');

module.exports.getExtention = async (fileName) => {
  return new Promise((resolve) => {
    const extension = fileName.substring(fileName.lastIndexOf('.'));
    resolve(extension);
  }).catch((e) => {
    // console.log('Woop... There was a problem while getting the file extention !');
    // console.log(e);
  });
};

module.exports.getMagnet = async (hash) => {
  return new Promise((resolve) => {
    const magnet = 'magnet:?xt=urn:btih:';
    resolve(magnet.concat(hash));
  }).catch((e) => {
    // console.log('Woops... There was a problem with the provided torrent magnet !');
    // console.log(e);
  });
};

module.exports.isVideo = async (mime) => {
  return new Promise((resolve) => {
    resolve(mimeTypes[mime] !== undefined);
  }).catch((e) => {
    // console.log('Woop... There was a problem in detecting if this file is a video !');
    // console.log(e);
  });
};

module.exports.findVideoFile = async (engine) => {
  return new Promise((resolve) => {
    let file;
    engine.files.forEach((current) => {
      const mime = this.getExtention(current.name);
      if (!this.isVideo(mime)) {
        return;
      }
      if (file && current.length < file.length) {
        return;
      }
      file = current;
    });
    resolve(file);
  }).catch((e) => {
    // console.log('Woop... There was a problem in getting the video file !');
    // console.log(e);
  });
};

module.exports.alreadyDownloaded = (id, file) => {
  return new Promise(async (resolve) => {
    if (fs.existsSync(`./assets/torrents/${file.name}`) && await DownloadMovie.getFileSizeInBytes(`./assets/torrents/${file.name}`) === file.length) {
      // console.log('Movie already exists');
      const data = { lastSeen: Date.now() };
      MovieManager.update(id, data);
      resolve(true);
    }

    const data = { lastSeen: Date.now() };
    MovieManager.update(id, data);
    resolve(false);
  }).catch((e) => {
    // console.log('Woop... There was a problem in knowing if this file was downloaded before !');
    // console.log(e);
  });
};
