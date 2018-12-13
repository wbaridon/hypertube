const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/db');
const fs = require('fs');
const app = express();
const hostname = 'localhost';
const port = 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const userRouter = require('./routes/userRouter');
const oAuthRouter = require('./routes/oAuthRouter');

app.use(express.static('assets'))
app.use('/user', userRouter);
app.use('/oAuth', oAuthRouter);

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.get('/video', function(req, res) {
  const path = 'assets/videos/music.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  console.log(range);
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    console.log("chunksize: " + chunksize);
    console.log("fileSize: " + fileSize);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
