const express = require('express');
const userRouter = express.Router();
const argon2 = require('argon2');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const resetPassword = require('../utils/resetPassword');
const tokenManager = require('../utils/token');
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
                res.status(200).send({ userName: user.userName, success: 'registration.success' })
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
          argon2.verify(getResult.password, user.password).then(match => {
            if (match) {
              tokenManager.set(user).then(token => { res.send({ token, locale: getResult.locale }); })
            } else { res.status(400).send({ error: 'login.invalidPasswordOrLogin' }) }
          })
      }, noSuchUser => {
        res.status(400).send({ error: 'login.noUser' })
      })
    } else { res.status(400).send({ error: 'login.emptyPasswordOrLogin' }) }
  })
  .post('/logout', (req, res) => {
    BlackListManager.add(req.body, callback => {
      res.status(200).send({success: 'logout.tokenDestroy'})
    })
  })
  .post('/getAllUsers', (req, res) => {
    tokenManager.decode(req.headers.authorization).then(token => {
      UserManager.getAllId().then(result => {
        res.status(200).send(result)
      })
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/getUser', (req, res) => {
    tokenManager.decode(req.headers.authorization).then(token => {
    // Reçoit un login et retourne les infos public de ce dernier
      let userName = req.body.userName;
      UserManager.getUser(userName).then(getResult => {
        console.log(getResult);
        const user = {
          userName: getResult.userName,
          picture: getResult.picture,
          lastName: getResult.lastName,
          firstName: getResult.firstName,
        }
        res.send(user)
      },
      (error) => res.status(404).json(error))
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/getUserPrivate', (req, res) => {
    tokenManager.decode(req.headers.authorization).then(token => {
      UserManager.getUser(token.user).then(user => {
        let newUser = user.toObject();
        delete newUser.moviesHistory
        delete newUser.__v
        delete newUser._id
        delete newUser.password
        res.send(newUser)
      })
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/updateUser', (req, res) => {
    tokenManager.decode(req.headers.authorization).then(token => {
        checkUserInput(req.body, token.user)
        .then(success => {
          res.status(200).send(success);
        }, error => {
          res.status(400).send(error);
        })
      }).catch(err => res.status(400).send({ error: 'token.invalidToken' }))
  })
  .post('/updatePicture', upload.single('image'), (req, res, next) => {
    console.log(req.body)
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      let oldPic =  './assets/images/' + req.body.oldImageUrl
      if (req.file) {
        // Si l'image existe on la supprime
        if (fs.existsSync(oldPic)) {
          fs.unlink(oldPic, (err) => {
            if (err) throw err;
          })
        }
        UserManager.updateUserField({'userName': user}, {'picture': req.file.filename})
        .then((updated) => {
          res.status(200).send({picture: req.file.filename, user: token.user, success: 'picture.Updated'})
        })
      }
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/resetPassword', (req, res) => {
    resetPassword.reset(req, res).then(ret => {
      if (ret.status === 0) { res.status(400).send(ret.error) }
      else { res.status(200).send(ret.success) }
    })
  })

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
    } else { error('registration.emptyFields') }
  })
}

function checkUserInput(data, user) {
  return new Promise((resolve, reject) => {
    switch (data.field) {
      case 'darkTheme':
        if (data.value === true || data.value === false) {
          updateField(data.field, data.value, user, callback => {
            resolve(callback) });
        } else { reject('update.badValue')}
        break;
        case 'locale':
          updateField(data.field, data.value, user, callback => {
            resolve(callback) });
          break;
        case 'firstName':
        updateField(data.field, data.value, user, callback => {
          resolve(callback) });
          break;
        case 'lastName':
        updateField(data.field, data.value, user, callback => {
          resolve(callback) });
          break;
        case 'email':
          if (data.value.match('.+@.+\..+')) {
            UserManager.getUserByMail(data.value).then(res => {
              if (res) { reject('update.emailAlreadyExist') }
              else {
                updateField(data.field, data.value, user, callback => {
                  resolve(callback) });
              }
            })
          } else { reject('update.badValue')}
          break;
        // password
      default: reject('update.badField')
    }
  })
}

function updateField(field, value, user, callback) {
  UserManager.updateUserField({'userName': user}, {[field]: value})
    .then(updated => {
      callback({[field]: value, 'user': user, 'success': [field]+'.Updated'});
    })
}
module.exports = userRouter;
