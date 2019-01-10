import Axios from 'axios';

export default function userListAPI(token) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/getAllUsers',
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
