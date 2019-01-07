import Axios from 'axios';

export default function updateUserAPI(email, token, changedValues) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/updateUser',
    data: {
      email,
      token,
      user: changedValues,
    },
    timeout: TIMEOUT_API,
  });
}
