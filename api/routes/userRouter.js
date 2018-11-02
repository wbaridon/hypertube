const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

userRouter
    .get('/', (req,res) => {
        res.json({'test':'test'})
    })
    .get('/2', (req,res) => {
        res.json({'test':'test'})
    })
    .get('/test', (req, res) => {
      var user = new User({
        email: 'wbaridon@student.42.fr'
      })
      user.save().then(function(){
        console.log('Ajout fait')
      })
    })
module.exports = userRouter;
