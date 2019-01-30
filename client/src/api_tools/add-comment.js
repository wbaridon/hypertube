import Axios from 'axios';

export default function addCommentAPI(token, comment, idMovie) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/comments/add',
    data: {
      token,
      comment,
      idMovie,
    },
    timeout: TIMEOUT_API,
  });
}
