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
        oauthGet.user(req.body.provider, token)
          .then(user => {
            console.log('ici')
            console.log(user)
            UserManager.getUserByMail(user.email).then(getResult => {
              tokenManager.set(user).then(token => { res.send({ token, profilIsFill: getResult.profilIsFill }); })
            }, noSuchUser => {
              console.log('no user')
              userNameIsFree(user.userName).then(isFree => {
                UserManager.createUser(user, callback => {
                  tokenManager.set(user).then(token => { res.send({ token, profilIsFill: false }); })
                })
              }).catch(isBusy => {
                  delete user.userName
                  UserManager.createUser(user, callback => {
                    tokenManager.set(user).then(token => { res.send({ token, profilIsFill: false }); })
                  })
                })
              })
            })
         });
      }).catch(error => res.status(400).send(error))
  })

function userNameIsFree (userName) {
  return new Promise ((resolve, reject) => {
    UserManager.getUser(userName).then(user => {
      reject();
    }, isFree => { resolve(); })
  })
}

function getToken(provider, path, clientCode, credentials) {
  return new Promise((resolve, reject) => {
    getCredentials(provider, credentials).then(credentials => {
      const oauth2 = require('simple-oauth2').create(credentials);
      const tokenConfig = {
        code: clientCode,
        redirect_uri: `http://localhost:8080${path}/${provider}`
      };
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
   else if (provider === 'facebook') { platformCredentials.facebook().then(credentials => resolve (credentials)) }
   else if (provider === 'linkedin') { platformCredentials.linkedin().then(credentials => resolve (credentials)) }
   else if (provider === 'instagram') { platformCredentials.instagram().then(credentials => resolve (credentials)) }
   else if (provider === '42') { platformCredentials.fortytwo().then(credentials => resolve (credentials)) }
  })
}

module.exports = oAuthRouter;
