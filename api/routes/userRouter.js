const express = require('express');
const userRouter = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const UserManager = require('../models/userManager');

userRouter
    .post('/register', urlencodedParser, (req, res) => {
      console.log(req.body)
      var user = {
        email: req.body.email,
        login: req.body.login,
        picture: '', // Voir comment le faire
        name: req.body.name,
        firstname: req.body.firstname,
        password: req.body.password
      }
      checkForm(user).then(result => {
        hashPassword(user.password).then(hash => {
          user.password = hash;
          UserManager.userExist(user.email, user.login).then(userExist => {
            if (userExist) { res.send({'error': 'Email or login already exist'}) }
            else {
              UserManager.createUser(user, callback => {
                res.send({'success': 'You are now registered'})
              })
            }
          })
        })
      }).catch(error => {
        res.send({'error': error})
      })
    })
    .post('/login', (req, res) => {
      const user = {
        "login": req.body.login,
        "password": req.body.password
      }
      if (user.login && user.password) {
        UserManager.getUser(user.login).then(getResult => {
          argon2.verify(getResult.password, user.password).then(match => {
            if (match) {
              setToken(user).then(appData => { res.status(200).json(appData); })
            } else { res.send({'error': 'Invalid password or login'})}
          })
        })
      } else { res.send({'error': 'Empty password or login'}) }
    })

function setToken(user) {
  return new Promise ((resolve, error) => {
    const appData = {}
    const token = jwt.sign(user, 'HypertubeSecretKey', { expiresIn: '1d'});
    appData.error = 0;
    appData["token"] = token;
    resolve(appData);
  })
}

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
        // Manque le check si chiffre et lettre dans mdp, picture
        resolve('Correct Form')
      }
    } else { error('Some fields are Empty')}
  })
}

module.exports = userRouter;
