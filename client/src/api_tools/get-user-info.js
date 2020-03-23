import Axios from 'axios';

export default function getUserInfoAPI(token, userName) {
  return Axios({
    method: 'post',
    url: `${API}:3000/user/getUser`,
    data: {
      userName,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
