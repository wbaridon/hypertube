import Axios from 'axios';

export default function loginUserAPI(user) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/login',
    data: {
      userName: user.userName,
      password: user.password,
    },
    timeout: TIMEOUT_API,
  });
}
