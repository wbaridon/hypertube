const express = require('express');
const torrentStream = require('torrent-stream');
const magnetLink = require('magnet-link')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/db');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const hostname = 'localhost';
const port = 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const userRouter = require('./routes/userRouter');
const oAuthRouter = require('./routes/oAuthRouter');
const libraryRouter = require('./routes/libraryRouter');

app.use(express.static('assets'))
app.use('/user', userRouter);
app.use('/library', libraryRouter);
app.use('/oAuth', oAuthRouter);

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.get('/video', function(req, res) {

  // Get torrent hash
  // const torrent_hash = '3D1E3C092836AF4F3C21C38C09E1F5550E137A32'; // New Work Minute
  const torrent_hash = req.query.videoHash;

  // Make usable magnet link
  const torrent_magnet = 'magnet:?xt=urn:btih:' + torrent_hash;


  // Using torrent_stream
  var engine = torrentStream(torrent_magnet);

  engine.on('ready', function() {
    // Iterates for each file linked in torrent
    engine.files.forEach(function(file) {
      let fileFormat = file.name.substr(file.name.length - 4);
      const fileSize = file.length

      // Check if server has something left to return
      const range = req.headers.range

      // If yes:
      if (range && (fileFormat === '.mp4')) {
        const parts = range.replace(/bytes=/, "").split("-")
        console.log('filename:', file.name)
        console.log(fileFormat);
        console.log(fileSize)
        console.log(parts)
        const startByte = parseInt(parts[0], 10)
        const endByte = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
        const chunksize = (endByte-startByte)+1

        // Create video stream from startByte to endByte
        var stream = file.createReadStream({
          start: startByte,
          end: endByte
        })

        if (fileFormat === '.mp4') { // Is an mp4 file
          const head = {
            'Content-Range': `bytes ${startByte}-${endByte}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
          }
          res.writeHead(206, head)
        }
        // Pipe what was returned so far
        stream.pipe(res)
      } else if (fileFormat === '.mp4') {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
      fs.createReadStream(file.path).pipe(res)
    }
  });
})


});

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
