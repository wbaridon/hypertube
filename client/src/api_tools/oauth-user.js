import Axios from 'axios';

export default function oAuthUserAPI(provider, clientCode) {
  return Axios({
    method: 'post',
    url: `${API}:3000/oAuth/login`,
    data: {
      provider,
      clientCode,
    },
    timeout: TIMEOUT_API,
  });
}
