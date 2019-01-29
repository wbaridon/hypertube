import Axios from 'axios';

export default function deleteCommentAPI(idComment) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/comments/delete',
    data: {
      id: idComment,
    },
    timeout: TIMEOUT_API,
  });
}
