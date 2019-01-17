import Axios from 'axios';

export default function changeUserPasswordAPI(token, field, currentPassword, newPassword, newPasswordRepeat) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/updateUser',
    data: {
      field,
      currentPassword,
      pass1: newPassword,
      pass2: newPasswordRepeat,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
