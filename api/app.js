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
const libraryRouter = require('./routes/libraryRouter');

app.use(express.static('assets'))
app.use('/user', userRouter);
app.use('/library', libraryRouter);
app.use('/oAuth', oAuthRouter);

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
