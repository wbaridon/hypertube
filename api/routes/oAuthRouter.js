const express = require('express');
const oAuthRouter = express.Router();
const axios = require('axios');

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
   .post('/register/42', async (req, res) => {
     const oauth2 = require('simple-oauth2').create(credentials);
     const tokenConfig = {
       code: req.body.clientCode,
       redirect_uri: 'http://localhost:8080'
     };
     try {
       const result =  await oauth2.authorizationCode.getToken(tokenConfig);
       const accessToken = oauth2.accessToken.create(result);
       const token = accessToken.token.access_token
       axios.get('https://api.intra.42.fr/v2/me', { headers: {"Authorization": `Bearer ${token}`}}).then(response => {
        var user = {
          email: response.data.email,
          login: response.data.login,
          picture: response.data.image_url,
          name: response.data.last_name,
          firstname: response.data.first_name,
          password: '',
        }
        res.send(user)
      })
    } catch (error) { console.log('Access Token Error', error.message); }
   })

   const credentialsGoogle = {
     client: {
       id: '796040540786-mcs3ojd9c07558mkatt5m1j185pol941.apps.googleusercontent.com',
       secret: 'S5_yCT_BnFVr5v9qM9Av9g6m'
      },
      auth: {
       tokenHost: 'https://api.intra.42.fr',
       tokenPath: '/oauth/token'
      }
   };
module.exports = oAuthRouter;
