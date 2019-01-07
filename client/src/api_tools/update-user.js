import Axios from 'axios';

export default function updateUserAPI(token, changes) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/updateUser',
    data: {
      token,
      user: changes,
    },
    timeout: TIMEOUT_API,
  });
}
