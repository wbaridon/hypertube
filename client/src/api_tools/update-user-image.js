import Axios from 'axios';

export default function updateUserImageAPI(formData) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/updatePicture',
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
    timeout: TIMEOUT_API,
  });
}
