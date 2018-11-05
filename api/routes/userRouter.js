const express = require('express');
const userRouter = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const argon2 = require('argon2');
const User = require('../models/user');

userRouter
    .post('/register', urlencodedParser, (req, res) => {
      var user = new User({
        email: req.body.email,
        login: req.body.login,
        picture: '', // Voir comment le faire
        name: req.body.name,
        firstname: req.body.firstname,
        password: req.body.password
      })
      checkForm(user).then(result => {
        hashPassword(user.password).then(hash => {
          user.password = hash;
        })
      }).catch(error => {
        // Formulaire incorrect
      })
      /*user.save().then(function(){
        console.log('Ajout fait')
      })*/
    })

function hashPassword(pwd) {
  return new Promise ((resolve, error) => {
    argon2.hash(pwd).then(hash => {
      resolve(hash);
    }).catch(err => {
      error(err);
    })
  })
}

function checkForm(user) {
  return new Promise ((resolve, error) => {
    if (user.email && user.login && user.name && user.firstname && user.password) {
      if (user.password.length < 6) { error('Password too short') }
      else {
        // Manque le check si data pas en db, si chiffre et lettre dans mdp, picture
        resolve('Correct Form')
      }
    } else { error('Empty Fields')}
  })
}

module.exports = userRouter;
