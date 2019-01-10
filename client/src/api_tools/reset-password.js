import Axios from 'axios';

export default function resetPasswordAPI(newPassword, token) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/resetPassword',
    data: {
      newPassword,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
