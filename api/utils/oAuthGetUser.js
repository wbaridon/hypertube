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
    switch (provider) {
      case 'github':
        getFrom(provider, 'https://api.github.com/user', token).then(user => { resolve(user) }).catch(error => { reject(error) });
        break;
      case '42':
        getFrom(provider, 'https://api.intra.42.fr/v2/me', token).then(user => { resolve(user) }).catch(error => { reject(error) });
        break;
    }
  });
}

function getFrom(provider, api, token) {
  return new Promise ((resolve, reject) => {
    axios.get(`${api}`, { headers: {"Authorization": `Bearer ${token}`}})
      .then(response => {
        userModel(provider, response.data, token)
          .then(user => {
            user.oauth = true;
            user.profilIsFill= false,
            user.locale= 'en',
            user.darkTheme= false
            resolve(user);
          }).catch(error => { reject(error) })
      }).catch(error => { reject(error) });
  })
}

function userModel(provider, data, token) {
  return new Promise ((resolve, reject) => {
    switch (provider) {
      case '42':
        var user = {
          email: data.email,
          userName: data.login,
          picture: data.image_url,
          name: data.last_name,
          firstname: data.first_name,
        }
        break;
      case 'github':
        axios.get(`https://api.github.com/user/emails`, { headers: {"Authorization": `Bearer ${token}`}})
        .then(emails => {
          var user = {
           email: emails.data[0].email,
           userName: data.login,
           picture: data.avatar_url
          }
        }).catch(error => { reject(error) });
        break;
    }
    resolve(user)
  })
}

module.exports.user = getUser;
