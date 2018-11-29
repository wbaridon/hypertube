import Axios from 'axios';

export default function logoutUserAPI(tokenHash) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/logout',
    data: {
      tokenHash,
    },
    timeout: TIMEOUT_API,
  });
}
