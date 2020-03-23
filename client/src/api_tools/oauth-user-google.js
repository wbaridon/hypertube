import Axios from 'axios';

export default function oAuthUserGoogleAPI(provider, accessToken, tokenType, expiresIn, scope) {
  return Axios({
    method: 'post',
    url: `${API}:3000/oAuth/login`,
    data: {
      provider,
      accessToken,
      tokenType,
      expiresIn,
      scope,
    },
    timeout: TIMEOUT_API,
  });
}
