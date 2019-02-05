import Axios from 'axios';

export default function deleteCommentAPI(idMovie, idComment, comment, token) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/comments/delete',
    data: {
      idMovie,
      idComment,
      comment,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
