import Axios from 'axios';

export default function registerUserAPI(formData) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/register',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: TIMEOUT_API,
  });
}
