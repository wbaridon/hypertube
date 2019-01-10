import Axios from 'axios';

export default function updateUserFieldAPI(token, field, value) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/updateUser',
    data: {
      field,
      value,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
