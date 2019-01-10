import Axios from 'axios';

export default function updateUserImageAPI(token, formData) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/updatePicture',
    data: formData,
    config: { headers: { Authorization: `Bearer ${token}` } },
    timeout: TIMEOUT_API,
  });
}
