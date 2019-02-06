import Axios from 'axios';

export default function sendHashAPI(hash) {
  console.log(hash);
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/video',
    data: {
      hash,
    },
    timeout: TIMEOUT_API,
  });
}
