import Axios from 'axios';

export default function updateUserFieldAPI(token, field, value) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/updateUser',
    data: {
      token,
      field,
      value,
    },
    timeout: TIMEOUT_API,
  });
}
