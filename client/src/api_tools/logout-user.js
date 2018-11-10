import Axios from 'axios';

export default function logoutUserAPI(user) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/user/logout',
    data: {
      userName: user.userName,
    },
  });
}
