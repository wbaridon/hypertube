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
const upload = multer({ storage: storage });

const UserManager = require('../models/userManager');
const BlackListManager = require('../models/blackListManager');
const resetPassword = require('../utils/resetPassword');

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
        locale: req.body.locale,
        darkTheme: req.body.darkTheme
      }
      checkForm(user).then(result => {
        hashPassword(user.password).then(hash => {
          user.password = hash;
          UserManager.userExist(user.email, user.userName).then(userExist => {
            if (userExist) { res.status(400).send({ error: 'registration.userAlreadyRegistered' }) }
            else {
              UserManager.createUser(user, callback => {
                res.status(200).send({ success: 'registration.success' })
              })
            }
          })
        })
      }).catch(error => {
        res.status(400).send({ 'error': error })
      })
    } else { res.status(400).send({ error: 'registration.undefinedPictureIssue' }) }
  })
  .post('/login', (req, res) => {
    const user = {
      userName: req.body.userName,
      password: req.body.password
    }
    if (user.userName && user.password) {
      UserManager.getUser(user.userName).then(getResult => {
        if (getResult) {
          argon2.verify(getResult.password, user.password).then(match => {
            if (match) {
              setToken(user).then(token => { res.send({ token, locale: getResult.locale }); })
            } else { res.status(400).send({ error: 'login.invalidPasswordOrLogin' }) }
          })
        } else { res.status(400).send({ error: 'login.noUser' }) }
      })
    } else { res.status(400).send({ error: 'login.emptyPasswordOrLogin' }) }
  })
  .post('/logout', (req, res) => {
    BlackListManager.add(req.body, callback => {
      res.status(200).send({success: 'logout.tokenDestroy'})
    })
  })
  .post('/getUser', (req, res) => {
    // Reçoit un login et retourne les infos public de ce dernier
    let userName = req.body.userName;
    UserManager.getUser(userName).then(getResult => {
      const user = {
        userName: getResult.userName,
        picture: getResult.picture,
        lastName: getResult.lastName,
        firstName: getResult.firstName,
      }
      res.send(user)
    })
  })
  .post('/getUserPrivate', (req, res) => {
    decodeToken(req.body.token).then(token => {
      UserManager.getUser(token.user).then(user => {
      /*  const user = {
          email: getResult.email,
          userName: getResult.userName,
          picture: getResult.picture,
          lastName: getResult.lastName,
          firstName: getResult.firstName,
          locale: getResult.locale,
        }*/
        res.send(user)
      })
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/updateUser', (req, res) => {
    decodeToken(req.body.token).then(token => {
      // Verifier que les prerequis des nouvelles data sont bon, les ajouter ici, et lancer update RESTE A FAIRE!
      UserManager.updateUser('userName', token.user, req.body.user).then(result => {
          res.send(result)
      }, (error) => {console.log(error)})
    }).catch(err => res.send({ error: 'token.invalidToken' }))

  })
  .post('/resetPassword', (req, res) => {
    resetPassword.reset(req, res).then(ret => {
      if (ret.status === 0) { res.status(400).send(ret.error) }
      else { res.status(200).send(ret.success) }
    })
  })

function setToken(user) {
  return new Promise((resolve, error) => {
    const token = jwt.sign({ user: user.userName }, 'HypertubeSecretKey', { expiresIn: '1d' });
    resolve(token);
  })
}

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'HypertubeSecretKey', function (err, decoded) {
      if (err) { reject('token.invalidToken') }
      else {
        // Rajouter ici le controle du blacklistage ip et renvoyer le resolve si pas blackliste
      /*  BlackListManager.get(token).then(getResult => {
          console.log(getResult)
        })*/
        resolve(decoded)
      }
    })
  })
}

function hashPassword(pwd) {
  return new Promise((resolve, error) => {
    argon2.hash(pwd).then(hash => {
      resolve(hash);
    }).catch(err => {
      error(err);
    })
  })
}

function checkForm(user) {
  return new Promise((resolve, error) => {
    if (user.email && user.userName && user.lastName && user.firstName && user.password) {
      if (user.password.length < 6) { error('registration.passwordTooShort') }
      else {
        // Manque le check si chiffre et lettre dans mdp, picture
        resolve('registration.correctForm')
      }
    } else { error('registration.emptyFields') } // Des erreurs plus explicites c'est toujours bien, pour savoir quel variable est le probleme!
  })
}

module.exports = userRouter;
