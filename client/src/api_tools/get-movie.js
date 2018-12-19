import Axios from 'axios';

export default function getVideoAPI(videoHash) {
  return Axios({
    method: 'get',
    url: 'http://localhost:3000/video',
    params: {
      videoHash,
    },
    timeout: TIMEOUT_API,
  });
}
