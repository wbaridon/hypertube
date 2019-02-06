const express = require('express');
const oAuthRouter = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const platformCredentials = require('../utils/oAuthPlatformCredentials');
const oauthGet = require('../utils/oAuthGetUser');
const tokenManager = require('../utils/token');

const UserManager = require('../models/userManager');

oAuthRouter
  .post('/login', (req, res) => {
    getCredentials(req.body.provider).then(credentials => {
      getToken(req.body.provider, '/oauth', req.body.clientCode, credentials)
      .then(token => {
        oauthGet.user(req.body.provider, token).then(user => {
          UserManager.getUserByMail(user.email).then(getResult => {
              tokenManager.set(getResult).then(token => { res.send({ token, profilIsFill: getResult.profilIsFill }); })
            }, noSuchUser => {
              userNameIsFree(user.userName).then(isFree => {
                user.userName = isFree;
                if (user.lastName && user.firstName && user.email && user.userName) {
                  user.profilIsFill = true
                } else { user.profilIsFill = false }
                UserManager.createUser(user, callback => {
                  tokenManager.set(user).then(token => { res.send({ token, profilIsFill: user.profileIsFill }); })
                })
              })
            })
         }).catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error))
    })
  })

function userNameIsFree (username) {
  return new Promise ((resolve, reject) => {
    UserManager.getUser(username).then(user => {
      findNewUsername(username, result => {
        resolve(result)
      })
    }, isFree => { resolve(username) })
  })
}

async function findNewUsername(username, result) {
  let check = 1;
  var i = 0;
  while (check === 1) {
    i++;
    var ret = await checkUsername(`${username}${i}`);
    if (ret) {
      check = 0;
      result(ret)
    }
 }
}

function checkUsername(username) {
  return new Promise ((resolve, reject) => {
    UserManager.getUser(username).then(user => {
      resolve()
    }, isFree => { resolve(username) })
  })
}

function getToken(provider, path, clientCode, credentials) {
  return new Promise((resolve, reject) => {
    getCredentials(provider, credentials).then(credentials => {
      const oauth2 = require('simple-oauth2').create(credentials);
      const tokenConfig = {
        code: clientCode,
        redirect_uri: `http://localhost:8080${path}/${provider}`,
      };
      if (provider === 'google') {
        tokenConfig.grant_type = 'authorization_code';
      }
      oauth2.authorizationCode.getToken(tokenConfig).then(result => {
         const accessToken = oauth2.accessToken.create(result);
         const token = accessToken.token.access_token
         resolve(token);
       }).catch (error => { reject({'error': 'registerOauth.accessTokenError'}); })
    });
  });
}

function getCredentials(provider) {
  return new Promise ((resolve, reject) => {
   if (provider === 'github') { platformCredentials.gitHub().then(credentials => resolve(credentials)) }
   else if (provider === 'gitlab') { platformCredentials.gitlab().then(credentials => resolve (credentials)) }
   else if (provider === 'fb') { platformCredentials.facebook().then(credentials => resolve (credentials)) }
   else if (provider === 'linkedin') { platformCredentials.linkedin().then(credentials => resolve (credentials)) }
   else if (provider === 'insta') { platformCredentials.instagram().then(credentials => resolve (credentials)) }
   else if (provider === '42') { platformCredentials.fortytwo().then(credentials => resolve (credentials)) }
   else if (provider === 'google') { platformCredentials.google().then(credentials => resolve (credentials)) }
  })
}

module.exports = oAuthRouter;
