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

module.exports.user = getUser;
