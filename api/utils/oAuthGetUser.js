const axios = require('axios');
const fs = require('fs');

function getUser(provider, token) {
  return new Promise ((resolve, reject) => {
    switch (provider) {
      case 'github':
        getFrom(provider, 'https://api.github.com/user', token).then(user => {
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
        getFrom(provider, 'https://www.googleapis.com/userinfo/v2/me', token).then(user => { resolve(user) }).catch(error => { reject(error) });
        break;
      case 'fb':
        getFrom(provider, 'https://graph.facebook.com/v3.2/me?fields=name,email', token).then(user => { resolve(user) }).catch(error => { reject(error) });
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
            user.profilIsFill= false;
            user.locale= 'en';
            user.darkTheme= false;
            resolve(user);
          }).catch(error => { reject(error) })
      }).catch(error => { reject(error) });
  })
}

function getFromInsta(provider, api, token) {
  return new Promise ((resolve, reject) => {
    axios.get(`${api}?access_token=${token}`)
      .then(response => {
        userModel(provider, response.data.data, token)
          .then(user => {
            user.oauth = true;
            user.profilIsFill= false;
            user.locale= 'en';
            user.darkTheme= false;
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
          lastName: data.last_name,
          firstName: data.first_name,
        }
        resolve(user)
        break;
      case 'fb':
        axios.get(`https://graph.facebook.com/v3.2/me/picture?width=178&height=180`, { headers: {"Authorization": `Bearer ${token}`}})
        .then(pic => {
        //  console.log(pic.data)

        //  fs.writeFile(`../assets/images/${data}.id`, result.data).catch(err => console.log(err))
          //pic nous retourne une url d'une image a download et save
          console.log('ici')
          let firstname = data.name.split(' ')[0]
          let name = data.name.split(' ')[1]
          var user = {
            email: data.email,
            userName: data.id,
          //  picture: data.image_url,
            lastName: name,
            firstName: firstname,
          }
          resolve(user)
          }).catch(error => reject(error))
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
        var user = {
          userName: data.username,
          picture: data.profile_picture,
        }
        resolve(user)
        break;
      case 'linkedin':
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
        var user = {
          email: data.email,
          userName: data.username,
          picture: data.avatar_url,
        }
        resolve(user)
        break;
      case 'google':
        var user = {
          email: data.email,
          userName: data.given_name,
          picture: data.picture,
        }
        resolve(user)
        break;
    }
  })
}

module.exports.user = getUser;
