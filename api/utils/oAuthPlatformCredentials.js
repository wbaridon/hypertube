const { twitterId, twitterSecret,
        gitHubId, gitHubSecret,
        redditId, redditSecret,
        gitlabId, gitlabSecret,
        linkedinId, linkedinSecret,
        instagramId, instagramSecret,
        facebookId, facebookSecret } = require('../config/env')

function facebookCredentials() {
  return new Promise ((resolve, reject) => {
    const credentials = {
      client: {
        id: facebookId,
        secret: facebookSecret,
      },
      auth: {
       tokenHost: 'https://graph.facebook.com',
       tokenPath: '/v3.2/oauth/access_token'
      }
    }
     resolve(credentials)
    })
}

function gitlabCredentials() {
  return new Promise ((resolve, reject) => {
    const credentials = {
      client: {
        id: gitlabId,
        secret: gitlabSecret,
      },
      auth: {
       tokenHost: 'http://gitlab.com',
       tokenPath: '/oauth/token'
      }
    }
     resolve(credentials)
    })
}

function linkedinCredentials() {
  return new Promise ((resolve, reject) => {
    const credentials = {
      client: {
        id: linkedinId,
        secret: linkedinSecret,
      },
      auth: {
        tokenHost: 'https://www.linkedin.com',
        tokenPath: '/oauth/v2/accessToken'
      }
    }
     resolve(credentials)
    })
}

function instagramCredentials() {
  return new Promise ((resolve, reject) => {
    const credentials = {
      client: {
        id: instagramId,
        secret: instagramSecret,
      },
      auth: {
       tokenHost: 'https://api.instagram.com',
       tokenPath: '/oauth/accessToken'
      }
    }
     resolve(credentials)
    })
}

function gitHubCredentials() {
  return new Promise ((resolve, reject) => {
    const credentials = {
      client: {
        id: gitHubId,
        secret: gitHubSecret,
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
module.exports.linkedin = linkedinCredentials;
module.exports.fortytwo = fortytwoCredentials;
module.exports.gitlab = gitlabCredentials;
module.exports.instagram = instagramCredentials;
module.exports.facebook = facebookCredentials;
