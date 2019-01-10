import Axios from 'axios';

export default function logoutUserAPI(token) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/logout',
    data: null,
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
