import Axios from 'axios';

export default function getSubtitlesAPI(movieId, token) {
  console.log(movieId, token);
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/movie/getSubtitles',
    data: {
      id: movieId,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
