var fs = require('fs');
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

function findVideoFile(engine) {
  let file;
  engine.files.forEach((current) => {
    let mime = getExtention(current.name);
    if (!isVideo(mime)) {
      return;
    } else if (file && current.length < file.length) {
      return;
    } else {
      file = current;
    }
  });
  return file;
}

function containsVideo(file, engine, res) {
  if (!file) {
    engine.removeAllListeners();
    engine.destroy();
    return res.send({ err: 'No video found on this torrent' });
  }
}

function alreadyDownloaded(engine, res) {
  const test = 'musique.mp4';

  if (fs.existsSync(`./torrents/${test}`)) {
    console.log('Movie already exists');
    const stream = fs.createReadStream(`./torrents/${test}`);
    stream.pipe(res);
    return true;
  } else {
    return false;
  }
}

torrentRouter
  .get('/', async (req, res) => {

  const hash = req.query.videoHash;

  const torrent_magnet = getMagnet(hash);
  var engine = torrentStream(torrent_magnet);

  engine.on('ready', function() {
    const file = findVideoFile(engine);
    containsVideo(file, engine, res);

    file.select();

<<<<<<< HEAD
    if (alreadyDownloaded(engine, res)) {
      return;
    }

    const writeStream = fs.createWriteStream(`assets/torrents/${file.name}`);
=======
    const pathFolder = fs.createWriteStream(`assets/torrents/${file.name}`);
>>>>>>> 88e67ddb21aeb4c730ca41259ead05a82c4f330d
    // const { frSubFilePath, enSubFilePath } = await createSubFile(req.idImdb, req.torrent.hash);
    // req.torrent.data = {
    //   path: `${pathFolder}/${file.path}`,
    //   enSubFilePath,
    //   frSubFilePath,
    //   name: file.name,
    //   size: file.length,
    //   torrentDate: new Date(),
    // };


    const stream = file.createReadStream()

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
      .on('end', function() {
        console.log('Finished processing');
      })
      .on('error', (err, stdout, stderr) => {
         console.log('ffmpeg, file:', file.path, ' Error:', '\nErr:', err, '\nStdOut:', stdout, '\nStdErr:', stderr);
      });

    console.log(getExtention(file.name).substr(1));

    converter.inputFormat(getExtention(file.name).substr(1))
    .audioCodec('aac')
    .videoCodec('libx264')
    .run();

    res.pipe(converter);

    stream.pipe(writeStream);

    res.on('close', () => {
      console.log('page closes, all processes killed');
      converter.kill();
      stream.destroy();
      writeStream.destroy();
    })
    engine.on('idle', () => {
      // Set to "SEEN" in database
      console.log(engine.swarm.downloaded);
      const pathFolder = `./torrents/${hash}`;
      // const { frSubFilePath, enSubFilePath } = await createSubFile(req.idImdb, req.torrent.hash);
      // req.torrent.data = {
      //   path: `${pathFolder}/${file.path}`,
      //   enSubFilePath,
      //   frSubFilePath,
      //   name: file.name,
      //   size: file.length,
      //   torrentDate: new Date(),
      // };
      fs.appendFile(pathFolder, file.data, function (err) {
        if (err) throw err;
        console.log("File movie saved");
      });
    });
  });
})

module.exports = torrentRouter;
