import Axios from 'axios';

export default function sendHashAPI(hash) {
  return Axios({
    method: 'post',
    url: `${API}:3000/torrentRouter/`,
    data: {
      hash,
    },
    timeout: TIMEOUT_API,
  });
}
