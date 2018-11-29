import Axios from 'axios';

export default function userInfoPrivateAPI(token) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/getUserPrivate',
    data: {
      token,
    },
    timeout: TIMEOUT_API,
  });
}
