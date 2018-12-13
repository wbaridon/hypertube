const express = require('express');
const libraryRouter = express.Router();
const jwt = require('jsonwebtoken');

libraryRouter
  .post('/', (req, res) => {
    console.log('test')
  })

module.exports = libraryRouter;
