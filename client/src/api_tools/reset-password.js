import Axios from 'axios';

export default function resetPasswordAPI(key, newPassword, newPasswordRepeat, email) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/resetPassword',
    data: {
      key,
      pass1: newPassword,
      pass2: newPasswordRepeat,
      email,
    },
    timeout: TIMEOUT_API,
  });
}
