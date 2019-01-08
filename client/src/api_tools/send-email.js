import Axios from 'axios';

export default function sendForgotPasswordEmailAPI(email) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/resetPassword',
    data: {
      email,
    },
    timeout: TIMEOUT_API,
  });
}
