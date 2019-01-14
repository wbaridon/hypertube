import Axios from 'axios';

export default function resetPasswordAPI(newPassword, newPasswordRepeat, key) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/resetPassword',
    data: {
      newPassword,
      newPasswordRepeat,
      key,
    },
    timeout: TIMEOUT_API,
  });
}
