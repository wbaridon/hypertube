import Axios from 'axios';

export default function addCommentAPI(userName, comment, timeStamp) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/comments/add',
    data: {
      username: userName,
      comment,
      time: timeStamp,
    },
    timeout: TIMEOUT_API,
  });
}
