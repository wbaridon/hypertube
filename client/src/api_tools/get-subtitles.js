import Axios from 'axios';

export default function getSubtitlesAPI(movieId, token) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/movie/getSubtitles',
    data: {
      imdbId: movieId,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
