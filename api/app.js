const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/db');
const fs = require('fs');
var schedule = require('node-schedule');
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
const movieRouter = require('./routes/movieRouter');
const commentsRouter = require('./routes/commentsRouter');
const watchListRouter = require('./routes/watchListRouter');
const torrentRouter = require('./routes/torrentRouter');
const yts = require('./utils/getMoviesFromYTS');
const eztv = require('./utils/getMoviesFromEZTV');
const torrentStorage = require('./utils/torrentStorage');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.use(express.static('assets'))
app.use('/user', userRouter);
app.use('/library', libraryRouter);
app.use('/oAuth', oAuthRouter);
app.use('/video', torrentRouter);
app.use('/movie', movieRouter);
app.use('/comments', commentsRouter);
app.use('/watchList', watchListRouter);

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
  yts.launcher()
  eztv.launcher()
});

var getNewMovies = schedule.scheduleJob('0 0 * * *', function(){
  // Execute la fonction a 0h
  yts.launcher()
  eztv.launcher()
  torrentStorage.deleteMovie()
});
