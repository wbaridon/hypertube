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
    console.log(req.body)
    console.log('OAuth: Login enter for ' + req.body.provider)
    getCredentials(req.body.provider).then(credentials => {
      console.log('Credentials for token: ' + req.body.clientCode)
      console.log(credentials)
      getToken(req.body.provider, '/oauth', req.body.clientCode, credentials)
      .then(token => {
        console.log('possede token: ' + token)
        oauthGet.user(req.body.provider, token)
          .then(user => {
            console.log('ici')
            UserManager.getUserByMail(user.email).then(getResult => {
              tokenManager.set(user).then(token => { res.send({ token, profilIsFill: getResult.profilIsFill }); })
            }, noSuchUser => {
              console.log('no user')
              userNameIsFree(user.userName).then(isFree => {
                UserManager.createUser(user, callback => {
                  tokenManager.set(user).then(token => { res.send({ token, profilIsFill: false }); })
                })
              }).catch(isBusy => {
                console.log('isBusy')
                  delete user.userName
                  UserManager.createUser(user, callback => {
                    tokenManager.set(user).then(token => { res.send({ token, profilIsFill: false }); })
                  })
                })
              })
            })
         }).catch(error => res.status(400).send(error));
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
    console.log('GetToken begin')
    console.log(provider)
    getCredentials(provider, credentials).then(credentials => {
      console.log('obtain creds')
      const oauth2 = require('simple-oauth2').create(credentials);
      const tokenConfig = {
        code: clientCode,
        redirect_uri: `http://localhost:8080${path}/${provider}`,
      };
      if (provider === 'google') {
        tokenConfig.grant_type = 'authorization_code';
      }
      console.log(credentials)
      console.log(tokenConfig)
      console.log('Before auth code')
      oauth2.authorizationCode.getToken(tokenConfig).then(result => {
        //console.log(result)
         const accessToken = oauth2.accessToken.create(result);
         const token = accessToken.token.access_token
         resolve(token);
       }).catch (error => { console.log(error); reject({'error': 'registerOauth.accessTokenError'}); })
    });
  });
}

function getCredentials(provider) {
  return new Promise ((resolve, reject) => {
   if (provider === 'github') { platformCredentials.gitHub().then(credentials => resolve(credentials)) }
   else if (provider === 'gitlab') { platformCredentials.gitlab().then(credentials => resolve (credentials)) }
   else if (provider === 'facebook') { platformCredentials.facebook().then(credentials => resolve (credentials)) }
   else if (provider === 'linkedin') { platformCredentials.linkedin().then(credentials => resolve (credentials)) }
   else if (provider === 'insta') { platformCredentials.instagram().then(credentials => resolve (credentials)) }
   else if (provider === '42') { platformCredentials.fortytwo().then(credentials => resolve (credentials)) }
   else if (provider === 'google') { platformCredentials.google().then(credentials => resolve (credentials)) }
  })
}

module.exports = oAuthRouter;
