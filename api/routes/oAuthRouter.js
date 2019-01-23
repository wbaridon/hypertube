const express = require('express');
const oAuthRouter = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const platformCredentials = require('../utils/oAuthPlatformCredentials');
const tokenManager = require('../utils/token');

const UserManager = require('../models/userManager');

oAuthRouter
  .post('/login', (req, res) => {
    getCredentials(req.body.provider).then(credentials => {
      getToken(req.body.provider, '/oauth', req.body.clientCode, credentials)
      .then(token => {
        getUserFrom(req.body.provider, token)
          .then(user => {
            console.log(user)
            UserManager.getUser(user.userName).then(getResult => {
              tokenManager.set(user).then(token => { res.send({ token, profilIsFill: getResult.profilIsFill }); })
            }, noSuchUser => {
              // Verifier que l'on a pas l'email ou le login deja en user normal
              // A faire
              UserManager.createUser(user, callback => {
                tokenManager.set(user).then(token => { res.send({ token, profilIsFill: false }); })
              })
            })
         });
      }).catch(error => res.status(400).send(error))
    });
  })

function getToken(provider, path, clientCode, credentials) {
  return new Promise((resolve, reject) => {
    getCredentials(provider, credentials).then(credentials => {
      const oauth2 = require('simple-oauth2').create(credentials);
      const tokenConfig = {
        code: clientCode,
        redirect_uri: `http://localhost:8080${path}/${provider}`
      };
      console.log(tokenConfig)
      oauth2.authorizationCode.getToken(tokenConfig).then(result => {
         const accessToken = oauth2.accessToken.create(result);
         const token = accessToken.token.access_token
         resolve(token);
       }).catch (error => { reject({'error': 'registerOauth.accessTokenError'}); })
    });
  });
}
function getUserFrom(provider, token) {
  return new Promise ((resolve, reject) => {
    console.log('GetUser')
    if (provider === 'github') {
      api = 'https://api.github.com/user'
      axios.get(`${api}`, { headers: {"Authorization": `Bearer ${token}`}}).then(response => {
        console.log(response.data);
        axios.get(`${api}/emails`, { headers: {"Authorization": `Bearer ${token}`}}).then(emails => {
          var user = {
           email: emails.data[0].email,
           userName: response.data.login,
           picture: response.data.avatar_url,
           oauth: true,
           profilIsFill: false,
           locale: 'en',
           darkTheme: false
         }
         console.log(user)
         // mon token 42 625c8be5dffc446ab45c450811b2cfff93edc75748de0c8650c144098e7f73e3
         resolve(user)
        });
     })
  /* } else if (provider === 'gitlab') {
     console.log('ici')
     api = 'http://gitlab.com/api/v4/user'
     axios.get(`${api}`, { headers: {"Authorization": `Bearer ${token}`}}).then(response => {
       console.log(response);
       var user = {
        email: response.data.email,
        userName: response.data.login,
        picture: response.data.avatar_url,
        oauth: true,
      }
      resolve(user)
    })*/
   } else {
     api = 'https://api.intra.42.fr/v2/me';
      axios.get(api, { headers: {"Authorization": `Bearer ${token}`}}).then(response => {
      var user = {
        email: response.data.email,
        userName: response.data.login,
        picture: response.data.image_url,
        name: response.data.last_name,
        firstname: response.data.first_name,
        oauth: true,
        profilIsFill: false,
        locale: 'en',
        darkTheme: false
      }
      resolve(user)
      })
    }
  })
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
