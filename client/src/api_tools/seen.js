import Axios from 'axios';

export default function seenAPI(token, idMovie) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/movie/seen',
    data: {
      movieId: idMovie,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
