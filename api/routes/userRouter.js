const express = require('express');
const userRouter = express.Router();
const argon2 = require('argon2');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const validator = require("email-validator");
const resetPassword = require('../utils/resetPassword');
const tokenManager = require('../utils/token');
const { racine } = require('../config/env');
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
    if (req.file) {
      var user = {
        email: req.body.email,
        userName: req.body.userName,
        picture: racine + 'images/' + req.file.filename,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        password: req.body.password,
        locale: req.body.locale,
        darkTheme: req.body.darkTheme,
        profilIsFill: true
      }
      checkForm(user).then(result => {
        hashPassword(user.password).then(hash => {
          user.password = hash;
          UserManager.userExist(user.email, user.userName).then(userExist => {
            if (userExist) { res.status(400).send({ error: 'register.userAlreadyRegistered' }) }
            else {
              UserManager.createUser(user, (callback) => {
                res.status(200).send({ userName: user.userName, success: 'register.success' })
              })
            }
          })
        })
      }).catch(error => {
        res.status(400).send({ 'error': error })
      })
    } else { res.status(400).send({ error: 'register.undefinedPictureIssue' }) }
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
        }).catch(err => console.log(err))
      }, noSuchUser => {
        res.status(400).send({ error: 'login.noUser' })
      }).catch(err => res.status(400).send({ error: 'login.oAuthAccount' }))
    } else { res.status(400).send({ error: 'login.emptyPasswordOrLogin' }) }
  })
  .post('/logout', (req, res) => {
    BlackListManager.add(req.body, (callback) => {
      res.status(200).send({ success: 'logout.tokenDestroy' })
    })
  })
  .post('/getAllUsers', (req, res) => {
    tokenManager.decode(req.headers.authorization).then(token => {
      UserManager.getAllId().then(result => {
        res.status(200).send(result)
      })
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }));
  })
  .post('/getUser', (req, res) => {
    tokenManager.decode(req.headers.authorization).then(token => {
      // Reçoit un login et retourne les infos public de ce dernier
      let userName = req.body.userName;
      UserManager.getUser(userName).then(getResult => {
        const user = {
          userName: getResult.userName,
          picture: getResult.picture,
          lastName: getResult.lastName,
          firstName: getResult.firstName,
          profilIsFill: getResult.profilIsFill,
        }
        res.send(user)
      },
        (error) => res.status(404).json(error))
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }));
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
      }).catch(err => res.status(400).json({ error: 'getUser.noUsername' }))
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }));
  })
  .post('/updateUser', (req, res) => {
    tokenManager.decode(req.headers.authorization).then(token => {
      data = {
        field: req.body.field,
        value: typeof req.body.value === 'string' ? req.body.value.trim() : req.body.value,
      }
      if (data.field === 'password') {
        data = {
          ...data,
          currentPassword: req.body.currentPassword,
          pass1: req.body.pass1,
          pass2: req.body.pass2,
        }
      }
      checkUserInput(data, token.user)
        .then(sucess => {
          if (data.field === 'userName') { token.user = data.value }
          CheckProfilIsFill(token.user).then(check => {
            if (check === true) { sucess.profilIsFill = true }
            res.status(200).send(sucess);
          })
        }, error => {
          console.log(error);
          UserManager.getUser(token.user).then(status => {
            let reply = {
              error: error,
              field: req.body.field,
              value: status[req.body.field],
            }
            res.status(400).send(reply);
          }).catch(err => res.status(400).send({ error: 'getUser.impossible' }))
        }).catch(err => console.log(err))
    }).catch(err => res.status(400).send({ error: 'token.invalidToken' }));
  })
  .post('/updatePicture', upload.single('image'), (req, res, next) => {
    tokenManager.decode(req.headers.authorization).then(token => {
      let user = token.user
      let oldPic = './assets/images/' + req.body.oldImageUrl
      if (req.file) {
        // Si l'image existe on la supprime
        if (fs.existsSync(oldPic)) {
          fs.unlink(oldPic, (err) => {
            if (err) throw err;
          })
        }
        UserManager.updateUserField({ 'userName': user }, { 'picture': racine + 'images/' + req.file.filename })
          .then((updated) => {
            CheckProfilIsFill(token.user).then(check => {
              if (check === true) { profilIsFill = true }
              else { profilIsFill = false }
              res.status(200).send({ picture: racine + 'images/' + req.file.filename, user: token.user, success: 'picture.Updated', profilIsFill })
            })
          })
      }
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }));
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
      if (user.password.length < 6) { error('register.passwordTooShort') }
      else if (user.password.match('^[a-zA-z]+$')) { error('register.passwordMissDigit') }
      else {
        // Manque le check picture
        resolve('register.correctForm');
      }
    } else { error('register.emptyFields'); }
  });
}

function updateField(field, value, user, callback) {
  UserManager.updateUserField({ userName: user }, { [field]: value })
    .then((updated) => {
      callback({ [field]: value, user, success: `settings.update.${field}` });
    }).catch(err => console.log(err));
}

function checkUserInput(data, user) {
  return new Promise((resolve, reject) => {
    switch (data.field) {
      case 'darkTheme':
        if (data.value === true || data.value === false) {
          updateField(data.field, data.value, user, (callback) => {
            resolve(callback);
          });
        } else { reject('settings.update.badValue'); }
        break;
      case 'locale':
        updateField(data.field, data.value, user, (callback) => {
          resolve(callback);
        });
        break;
      case 'userName':
        if (data.value) {
          UserManager.getUser(data.value).then((res) => {
            reject('settings.update.userAlreadyExist');
          }, (noUser) => {
            const newUser = {
              userName: data.value,
            };
            tokenManager.set(newUser).then((token) => {
              updateField(data.field, data.value, user, (callback) => {
                resolve(token, callback);
              });
            })
          })
        } else { reject('settings.update.emptyUsername'); }
        break;
      case 'firstName':
        if (data.value) {
          updateField(data.field, data.value.trim(), user, (callback) => {
            resolve(callback)
          });
        } else { reject('settings.update.emptyFirstName'); }
        break;
      case 'lastName':
        if (data.value) {
          updateField(data.field, data.value.trim(), user, (callback) => {
            resolve(callback)
          });
        } else { reject('settings.update.emptyLastName'); }
        break;
      case 'email':
        if (validator.validate(data.value)) {
          UserManager.getUserByMail(data.value).then((res) => {
            reject('settings.update.emailAlreadyExist');
          }, (noMail) => {
            updateField(data.field, data.value, user, (callback) => {
              resolve(callback)
            });
          })
        } else {
          reject('settings.update.badValue')
        }
        break;
      case 'password':
        if (data.pass1 === data.pass2) {
          if (data.pass1.length < 6 || data.pass1.match('^[a-zA-z]+$')) {
            reject('settings.update.passwordIncorrectFormat');
          } else {
            UserManager.getUser(user).then((userData) => {
              argon2.verify(userData.password, data.currentPassword).then((match) => {
                if (match) {
                  argon2.hash(data.pass1).then((hash) => {
                    UserManager.updateUserField({ userName: user }, { password: hash });
                    resolve({ user, success: 'password.updated' });
                  });
                } else { reject('settings.update.badPassword'); }
              });
            });
          }
        } else { reject('settings.update.newPasswordnoMatch'); }
        break;
      default: reject('settings.update.badField');
    }
  });
}


function CheckProfilIsFill(login) {
  return new Promise((resolve, reject) => {
    UserManager.getUser(login).then(user => {
      if (user.profilIsFill === false) {
        if (user.userName && user.firstName && user.lastName && user.email && user.picture) {
          UserManager.updateUserField({ 'userName': login }, { 'profilIsFill': true })
            .then(isFill => { resolve(true) }).catch(error => { console.log(error) })
        } else { resolve(false); }
      } else { resolve(true) }
    })
  })
}

module.exports = userRouter;
