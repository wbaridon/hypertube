const express = require('express');
const oAuthRouter = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const platformCredentials = require('../utils/oAuthPlatformCredentials');

oAuthRouter
  /*.post('/register', (req, res) => {
    getCredentials(req.body.provider).then(credentials => {
      getToken(req.body.provider, req.url, req.body.clientCode, credentials)
      .then(token => {

        // Renvoi en front de l'user pour remplir les champs manquant,
        // Faire une verif avant si le compte existe pas deja ou apres sur la route normal ?
        // Et en front on validera les informations ensuite.. On ne doit pas pouvoir modifier le login et mail
        getUserFrom(req.body.provider, token).then(user => res.send(user))
      }).catch(error => res.status(400).send(error))
    })
  })*/
  .post('/login', (req, res) => {
    console.log(req.body)
  getCredentials(req.body.provider).then(credentials => {
    getToken(req.body.provider, req.url, req.body.clientCode, credentials)
    .then(token => {
      console.log('ici: ' + token)
      getUserFrom(req.body.provider, token).then(user =>
        // Au register il faudra checker que le compte est pas deja pris
        // Il faut renvoyer un token jwt par rapport au compte ou le token oauth ?
         res.send('non fonctionnel')
       );
    }).catch(error => console.log(error))//res.status(400).send(error))
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
      oauth2.authorizationCode.getToken(tokenConfig).then(result => {
         const accessToken = oauth2.accessToken.create(result);
         const token = accessToken.token.access_token
         resolve(token);
       }).catch (error => { console.log(error); reject({'error': 'registerOauth.accessTokenError'}); })
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
       // mon token 42 625c8be5dffc446ab45c450811b2cfff93edc75748de0c8650c144098e7f73e3
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
