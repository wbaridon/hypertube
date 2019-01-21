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
const torrentRouter = require('./routes/torrentRouter');
const yts = require('./utils/getMoviesFromYTS');
const eztv = require('./utils/getMoviesFromEZTV');

app.use(express.static('assets'))
app.use('/user', userRouter);
app.use('/library', libraryRouter);
app.use('/oAuth', oAuthRouter);
app.use('/video', torrentRouter);
app.use('/movie', movieRouter);
app.use('/comments', commentsRouter);

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.listen(port, function () {
  yts.launcher()
  eztv.launcher()
  console.log(`Server running at http://${hostname}:${port}/`);
});

var getNewMovies = schedule.scheduleJob('42 * * * *', function(){
  console.log('Execute cette fonction a chaque fois que la minute est 42');

});
