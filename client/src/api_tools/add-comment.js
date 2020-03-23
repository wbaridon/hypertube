import Axios from 'axios';

export default function addCommentAPI(token, comment, idMovie) {
  return Axios({
    method: 'post',
    url: `${API}:3000/comments/add`,
    data: {
      comment,
      idMovie,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
