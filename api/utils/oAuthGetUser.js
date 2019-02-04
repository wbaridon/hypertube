const axios = require('axios');

function getUser(provider, token) {
  return new Promise ((resolve, reject) => {

  /*  if (provider === 'github') { platformCredentials.gitHub().then(credentials => resolve(credentials)) }
    else if (provider === 'gitlab') { platformCredentials.gitlab().then(credentials => resolve (credentials)) }
    else if (provider === 'facebook') { platformCredentials.facebook().then(credentials => resolve (credentials)) }
    else if (provider === 'linkedin') { platformCredentials.linkedin().then(credentials => resolve (credentials)) }
    else if (provider === 'instagram') { platformCredentials.instagram().then(credentials => resolve (credentials)) }
    else if (provider === '42') { platformCredentials.fortytwo().then(credentials => resolve (credentials)) }
  })*/
  console.log('Get user oAuth with ' + provider)
    switch (provider) {
      case 'github':
        getFrom(provider, 'https://api.github.com/user', token).then(user => {
          console.log(user)
          resolve(user) }).catch(error => { reject(error) });
        break;
      case '42':
        getFrom(provider, 'https://api.intra.42.fr/v2/me', token).then(user => { resolve(user) }).catch(error => { reject(error) });
        break;
      case 'insta':
        getFromInsta(provider, 'https://api.instagram.com/v1/users/self/', token).then(user => { resolve(user) }).catch(error => { reject(error) });
        break;
      case 'linkedin':
        getFrom(provider, 'https://api.linkedin.com/v2/me', token).then(user => { resolve(user) }).catch(error => { reject(error) });
        break;
      case 'gitlab':
        getFrom(provider, 'https://gitlab.com/api/v4/user', token).then(user => { resolve(user) }).catch(error => { reject(error) });
        break;
      case 'google':
        getFrom(provider, 'https://www.googleapis.com/oauth2/v2/userinfo', token).then(user => { resolve(user) }).catch(error => { reject(error) });
        break;
    }
  });
}

function getFrom(provider, api, token) {
  return new Promise ((resolve, reject) => {
    console.log('Enter in getFrom with token ' + token)
    axios.get(`${api}`, { headers: {"Authorization": `Bearer ${token}`}})
      .then(response => {
        console.log('Obtain a response')
        userModel(provider, response.data, token)
          .then(user => {
            user.oauth = true;
            user.profilIsFill= false;
            user.locale= 'en';
            user.darkTheme= false;
            resolve(user);
          }).catch(error => { reject(error) })
      }).catch(error => {
        console.log(error);
        reject(error) });
  })
}

function getFromInsta(provider, api, token) {
  return new Promise ((resolve, reject) => {
    console.log('Enter in getFromInsta with token ' + token)
    axios.get(`${api}?access_token=${token}`)
      .then(response => {
        console.log('Obtain a response')
        userModel(provider, response.data.data, token)
          .then(user => {
            user.oauth = true;
            user.profilIsFill= false;
            user.locale= 'en';
            user.darkTheme= false;
            resolve(user);
          }).catch(error => { reject(error) })
      }).catch(error => {
        console.log(error);
        reject(error) });
  })
}

function userModel(provider, data, token) {
  return new Promise ((resolve, reject) => {
    console.log('Enter in userModel')
    switch (provider) {
      case '42':
        var user = {
          email: data.email,
          userName: data.login,
          picture: data.image_url,
          name: data.last_name,
          firstname: data.first_name,
        }
        resolve(user)
        break;
      case 'github':
        axios.get(`https://api.github.com/user/emails`, { headers: {"Authorization": `Bearer ${token}`}})
        .then(emails => {
          var user = {
           email: emails.data[0].email,
           userName: data.login,
           picture: data.avatar_url
          }
          resolve(user)
        }).catch(error => { reject(error) });
        break;
      case 'insta':
        console.log(data)
        var user = {
          userName: data.username,
          picture: data.profile_picture,
        }
        resolve(user)
        break;
      case 'linkedin':
        console.log(data)
        var user = {
          email: data.email,
          userName: data.login,
          picture: data.image_url,
          name: data.last_name,
          firstname: data.first_name,
        }
        resolve(user)
        break;
      case 'gitlab':
        console.log(data)
        var user = {
          email: data.email,
          userName: data.username,
          picture: data.avatar_url,
        }
        resolve(user)
        break;
      case 'google':
        console.log(data)
        var user = {
          picture: data.picture,
        }
        resolve(user)
        break;
    }
  })
}

module.exports.user = getUser;
