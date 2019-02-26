const { twitterId, twitterSecret,
        gitHubId, gitHubSecret,
        redditId, redditSecret,
        gitlabId, gitlabSecret,
        linkedinId, linkedinSecret,
        instagramId, instagramSecret,
        googleId, googleSecret,
        fortytwoId, fortytwoSecret,
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
       tokenHost: 'https://gitlab.com/',
       tokenPath: '/oauth/token'
     },
     options: {
       authorizationMethod: 'body',
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
      },
      options: {
        authorizationMethod: 'body',
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
       tokenPath: '/oauth/access_token'
     },
     options: {
       authorizationMethod: 'body',
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
        id: googleId,
        secret: googleSecret
      },
      auth: {
       tokenHost: 'https://www.googleapis.com',
       tokenPath: '/oauth2/v4/token'
     },
      options: {
        authorizationMethod: 'body',
      }
    }
     resolve(credentials)
    })
}

function fortytwoCredentials() {
  return new Promise ((resolve, reject) => {
   const credentials = {
     client: {
       id: fortytwoId,
       secret: fortytwoSecret
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
module.exports.google = googleCredentials;
