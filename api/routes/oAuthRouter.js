const express = require('express');
const oAuthRouter = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const axios = require('axios');

// 42 credentials by default
const credentials = {
  client: {
    id: '5c2c11c20bea09a8590b502f86b0c5cf6a64faada97ce1bc7f13dabd64a128cd',
    secret: 'a8d824a530c12a814fa79c5427feacdb37e58e9b6d740d443833dd94db3e1fac'
   },
   auth: {
    tokenHost: 'https://api.intra.42.fr',
    tokenPath: '/oauth/token'
   }
};

oAuthRouter
  .post('/register', (req, res) => {
    getToken(req.body.provider, req.url, req.body.clientCode, credentials)
    .then(token => {
      getUserFrom(req.body.provider, token).then(user => res.send(user))
    }).catch(error => res.send(error))
  })
  .post('/login', (req, res) => {
    getToken(req.body.provider, req.url, req.body.clientCode, credentials)
    .then(token => {
      getUserFrom(req.body.provider, token).then(user =>
        // Au register il faudra checker que le compte est pas deja pris
        // Il faut renvoyer un token jwt par rapport au compte ou le token oauth ?
         res.send('non fonctionnel')
       );
    }).catch(error => res.send(error))
  })

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
       }).catch (error => { reject({'error': 'Access Token Error'}); })
    });
  });
}
function getUserFrom(provider, token) {
  return new Promise ((resolve, reject) => {
    if (provider === 'github') {
      api = 'https://api.github.com/user'
      axios.get(`${api}`, { headers: {"Authorization": `Bearer ${token}`}}).then(response => {
        var user = {
         email: response.data.email,
         login: response.data.login,
         picture: response.data.avatar_url,
         name: response.data.name,
         firstname: '',
         password: '',
       }
       resolve(user)
     })
   } else {
     api = 'https://api.intra.42.fr/v2/me';
      axios.get(api, { headers: {"Authorization": `Bearer ${token}`}}).then(response => {
      var user = {
        email: response.data.email,
        login: response.data.login,
        picture: response.data.image_url,
        name: response.data.last_name,
        firstname: response.data.first_name,
        password: '',
      }
      resolve(user)
      })
    }
  })
}

function getCredentials(provider, credentials) {
  return new Promise ((resolve, reject) => {
   if (provider === 'gitHub') { gitHubCredentials(credentials).then(credentials => resolve(credentials)) }
   else if (provider === 'twitter') { twitterCredentials(credentials).then(credentials => resolve (credentials)) }
   else if (provider === '42') { resolve(credentials) }
  })
}

function twitterCredentials(credentials) {
  return new Promise ((resolve, reject) => {
    credentials.client = {
      id: 'DuPzbiO2zGT18nD4j1WhDG77j ',
      secret: 'rbrCtZxNuwYxDMFAs4MqWuOEZm04JHJFNfP6VF75IGmxHCGRah',
    }
    credentials.auth = {
     tokenHost: 'https://api.twitter.com',
     tokenPath: '/oauth2/token'
    }
     resolve(credentials)
    })
}

function gitHubCredentials(credentials) {
  return new Promise ((resolve, reject) => {
    credentials.client = {
      id: 'ca9256d31baf98f55288',
      secret: '140364a557eb1574fda5e4f57c4e609aed6d7734',
    }
    credentials.auth = {
     tokenHost: 'https://github.com',
     tokenPath: '/login/oauth/access_token'
    }
     resolve(credentials)
    })
   }

module.exports = oAuthRouter;
