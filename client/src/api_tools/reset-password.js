import Axios from 'axios';

export default function resetPasswordAPI(newPassword, newPasswordRepeat, token) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/resetPassword',
    data: {
      newPassword,
      newPasswordRepeat,
      token,
    },
    timeout: TIMEOUT_API,
  });
}
