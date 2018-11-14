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
  const videoTag = document.getElementById("videoPlayer");

  console.log("coucou");

  // creating the MediaSource
  const myMediaSource = new MediaSource();
  const url = URL.createObjectURL(myMediaSource);

  // attaching the MediaSource to the video tag
  videoTag.src = url;

  // 1. Creating source buffers
  const audioSourceBuffer = myMediaSource
    .addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
  const videoSourceBuffer = myMediaSource
    .addSourceBuffer('video/mp4; codecs="avc1.64001e"');

  // 2. download and add our audio/video to the SourceBuffers:
  // audio SourceBuffer
  fetch("http://localhost:3000/videos/music.mp4").then(function(response) {
  // The data has to be a JavaScript ArrayBuffer
  return response.arrayBuffer();
  }).then(function(audioData) {
    audioSourceBuffer.appendBuffer(audioData);
  });

  // video SourceBuffer
  fetch("http://localhost:3000/videos/music.mp4").then(function(response) {
  // The data has to be a JavaScript ArrayBuffer
  return response.arrayBuffer();
  }).then(function(videoData) {
    videoSourceBuffer.appendBuffer(videoData);
  });
});

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
