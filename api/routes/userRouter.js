const express = require('express');
const userRouter = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const crypto = require('crypto');
const storage = multer.diskStorage({
  destination: './assets/images/',
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return callback(err);
      str = file.mimetype
      callback(null, `${raw.toString('hex')}.${str.slice(6)}`)
    })
  }
})
const upload = multer({storage:storage});

const UserManager = require('../models/userManager');

userRouter
    .post('/register', upload.single('image'), (req, res, next) => {
      console.log(req.file)
      if (req.file) {
        var user = {
          email: req.body.email,
          userName: req.body.userName,
          picture: req.file.filename,
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          password: req.body.password,
          locale: req.body.locale
        }
        checkForm(user).then(result => {
          hashPassword(user.password).then(hash => {
            user.password = hash;
            UserManager.userExist(user.email, user.userName).then(userExist => {
              if (userExist) { res.send({'error': 'Email or User name already exist'}) } // changer l'erreur a un id de traduction ex: 'api.errors.alreadyExists'
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
      } else { res.send({'error': 'We have a problem with your picture'})}
    })
    .post('/login', (req, res) => {
      const user = {
        userName: req.body.userName,
        password: req.body.password
      }
      if (user.userName && user.password) {
        UserManager.getUser(user.userName).then(getResult => {
          argon2.verify(getResult.password, user.password).then(match => {
            if (match) {
              setToken(user).then(appData => { res.status(200).json(appData); })
            } else { res.send({'error': 'Invalid password or login'})}
          })
        })
      } else { res.send({'error': 'Empty password or login'}) }
    })
    .post('/getUser', (req, res) => {
      // Reçoit un login et retourne les infos public de ce dernier
      let userName = req.body.userName;
      UserManager.getUser(userName).then(getResult => {
        const user = {
          userName: getResult.userName,
          picture: getResult.picture,
          lastName: getResult.lastName,
          firstName: getResult.firstName
        }
        res.send(user)
      })
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
    if (user.email && user.userName && user.lastName && user.firstName && user.password) {
      if (user.password.length < 6) { error('Password too short') }
      else {
        // Manque le check si chiffre et lettre dans mdp, picture
        resolve('Correct Form')
      }
    } else { error('Some fields are Empty')} // Des erreurs plus explicites c'est toujours bien, pour savoir quel variable est le probleme!
  })
}

module.exports = userRouter;
