const fs = require('fs');
const express = require('express');

const torrentRouter = express.Router();
const torrentStream = require('torrent-stream');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

const TorrentManager = require('../models/torrentManager');
const DownloadMovie = require('../utils/downloadMovie.js');

torrentRouter
  .get('/', async (req, res) => {
    const {
      videoHash,
      id,
    } = req.query;
    // getSubtitles.launcher(id)
    const hash = videoHash;
    const torrentMagnet = await TorrentManager.getMagnet(hash);
    const engine = torrentStream(torrentMagnet, {
      // Trouver un repertoire tmp qui bug pas
      tmp: './assets/tmp',
    });

    engine.on('ready', async () => {
      const file = await TorrentManager.findVideoFile(engine);
      if (!file) {
        engine.removeAllListeners();
        engine.destroy();
        return res.send({ err: 'No video found on this torrent' });
      }

      file.select();

      let stream = null;
      const extension = await TorrentManager.getExtention(file.name);
      const realExtension = extension.substr(1);
      if (await TorrentManager.alreadyDownloaded(id, file) === true) {
        stream = fs.createReadStream(`./assets/torrents/${file.name}`);
      } else {
        stream = file.createReadStream();
        DownloadMovie.downloadMovie(file, id);
      }
      const converter = ffmpeg()
        .input(stream)
        .outputOptions('-movflags frag_keyframe+empty_moov')
        .outputFormat('mp4')
        .on('end', () => {
          // console.log('Finished processing');
        })
        .on('error', (err) => {
          // console.log('=========== ffmpeg notice: ===========\n', err.message);
        })
        .inputFormat(realExtension)
        .audioCodec('aac')
        .videoCodec('libx264')
        .pipe(res);

      // let writeStream = null;
      // if (!downloaded) {
      //   writeStream = fs.createWriteStream(`./assets/torrents/${file.name}`);
      //   stream.pipe(writeStream);
      // }

      res.on('close', () => {
        // console.log('page closes, all processes killed');
        stream.destroy();
      });
      return null;
    });
  });
module.exports = torrentRouter;
