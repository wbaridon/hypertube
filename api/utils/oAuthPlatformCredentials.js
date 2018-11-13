function twitterCredentials(credentials) {
  return new Promise ((resolve, reject) => {
    credentials.client = {
      id: 'DuPzbiO2zGT18nD4j1WhDG77j ',
      secret: 'rbrCtZxNuwYxDMFAs4MqWuOEZm04JHJFNfP6VF75IGmxHCGRah',
    }
    credentials.auth = {
     tokenHost: 'https://api.twitter.com',
     tokenPath: '/oauth2/token'
    }
     resolve(credentials)
    })
}

function gitHubCredentials(credentials) {
  return new Promise ((resolve, reject) => {
    credentials.client = {
      id: 'ca9256d31baf98f55288',
      secret: '140364a557eb1574fda5e4f57c4e609aed6d7734',
    }
    credentials.auth = {
     tokenHost: 'https://github.com',
     tokenPath: '/login/oauth/access_token'
    }
     resolve(credentials)
    })
   }

module.exports.gitHub = gitHubCredentials;
module.exports.twitter = twitterCredentials;
