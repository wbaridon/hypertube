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
   .get('/register/42', async (req, res) => {
     const oauth2 = require('simple-oauth2').create(credentials);
     const tokenConfig = {
       code: req.body.clientCode,
       redirect_uri: 'http://localhost:8080'
     };
     try {
      const result =  await oauth2.authorizationCode.getToken(tokenConfig);
      const accessToken = oauth2.accessToken.create(result);
      console.log(accessToken)
      const token = accessToken.token.access_token
      console.log(token)
      axios.get('https://api.intra.42.fr/v2/me', { headers: {"Authorization": `Bearer ${token}`}}).then(response => {
        console.log(response.data.email)
        var user = {
          email: response.data.email,
          login: response.data.login,
          picture: response.data.image_url, // Voir comment le faire
          name: response.data.last_name,
          firstname: response.data.first_name,
          password: '',
        }
        res.send(user)
        console.log(user)
      }).catch ()
    } catch (error) { console.log('Access Token Error', error.message); }
   })
   .get('/test', (req, res) => {
     const host = 'https://api.intra.42.fr/';
     const authPath = 'oauth/authorize';
     const client = credentials.client;
     console.log('enter')
     axios.get(`${host}${authPath}?client_id=${client.id}&scope=public&response_type=code&state=matchatest&redirect_uri=http://localhost:3000/oauth/test2`)
     .then(response => {
       console.log(response.data)
     }).catch (error => console.log(error))
   })
   .get('/test2', (req, res) => {
     console.log('arrive')
     console.log(req.query)
   })


module.exports = oAuthRouter;
