import Axios from 'axios';

export default function sendHashAPI(hash) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/torrentRouter/',
    data: {
      hash,
    },
    timeout: TIMEOUT_API,
  });
}
