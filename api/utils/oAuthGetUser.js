const axios = require('axios');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

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
          downloadImage(data.avatar_url).then(pic => {
            var user = {
               email: emails.data[0].email,
               userName: data.login,
               lastName: data.name,
               picture: pic
             }
              resolve(user)
          }).catch(err => reject(err))
        }).catch(error => { reject(error) });
        break;
      case 'insta':
        downloadImage(data.profile_picture).then(pic => {
          let firstname = data.full_name.split(' ')[0]
          let name = data.full_name.split(' ')[1]
          var user = {
            userName: data.username,
            picture: pic,
            lastName: name,
            firstName: firstname,
            email: data.username+ '@instagram.com'
          }
          resolve(user)
        }).catch(err => reject(err))
        break;
      case 'gitlab':
        downloadImage(data.avatar_url).then(pic => {
          let firstname = data.name.split(' ')[0]
          let name = data.name.split(' ')[1]
          var user = {
            email: data.email,
            userName: data.username,
            picture: pic,
            lastName: name,
            firstName: firstname
          }
          resolve(user)
        }).catch(err => reject(err))
        break;
      case 'google':
        downloadImage(data.picture).then(pic => {
          let firstname = data.name.split(' ')[0]
          let name = data.name.split(' ')[1]
          var user = {
            email: data.email,
            userName: data.given_name,
            picture: pic,
            lastName: name,
            firstName: firstname
          }
          resolve(user)
        }).catch(err => reject(err))
        break;
    }
  })
}

function downloadImage(url){
  return new Promise((resolve, reject) => {
    axios.get(url,{
      responseType: 'stream'
    })
    .then(res => {
      let path = 'assets/images/';
      let filename = uuidv1();
      let extension = getExtention(res.headers['content-type'])
      res.data.pipe(fs.createWriteStream(path + filename + extension))
      resolve('http://localhost:3000/images/'+ filename + extension)
    }).catch(error => reject('downloadImage.imageNotUploaded'))
  })
}

function getExtention(fileName) {
  let extension = fileName.substring(fileName.lastIndexOf('/'));
  return extension.replace('/', '.')
}

module.exports.user = getUser;
