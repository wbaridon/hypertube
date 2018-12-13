function twitterCredentials() {
  return new Promise ((resolve, reject) => {
    credentials.client = {
      id: 'DuPzbiO2zGT18nD4j1WhDG77j',
      secret: 'rbrCtZxNuwYxDMFAs4MqWuOEZm04JHJFNfP6VF75IGmxHCGRah',
    }
    credentials.auth = {
     tokenHost: 'https://api.twitter.com',
     tokenPath: '/oauth2/token'
    }
     resolve(credentials)
    })
}

function gitHubCredentials() {
  return new Promise ((resolve, reject) => {
    const credentials = {
      client: {
        id: 'ca9256d31baf98f55288',
        secret: '140364a557eb1574fda5e4f57c4e609aed6d7734'
      },
      auth: {
       tokenHost: 'https://github.com',
       tokenPath: '/login/oauth/access_token'
      }
    }
     resolve(credentials)
    })
}

function googleCredentials() {
  return new Promise ((resolve, reject) => {
    const credentials = {
      client: {
        id: '796040540786-mcs3ojd9c07558mkatt5m1j185pol941.apps.googleusercontent.com',
        secret: 'S5_yCT_BnFVr5v9qM9Av9g6m'
      },
      auth: {
       tokenHost: 'https://www.googleapis.com',
       tokenPath: '/oauth2/v4/token'
      }
    }
     resolve(credentials)
    })
}

function fortytwoCredentials() {
  return new Promise ((resolve, reject) => {
   const credentials = {
     client: {
       id: '5c2c11c20bea09a8590b502f86b0c5cf6a64faada97ce1bc7f13dabd64a128cd',
       secret: 'a8d824a530c12a814fa79c5427feacdb37e58e9b6d740d443833dd94db3e1fac'
      },
      auth: {
       tokenHost: 'https://api.intra.42.fr',
       tokenPath: '/oauth/token'
      }
    }
    resolve(credentials)
  })
}

module.exports.gitHub = gitHubCredentials;
module.exports.twitter = twitterCredentials;
module.exports.fortytwo = fortytwoCredentials;
