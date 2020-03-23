import Axios from 'axios';

export default function movieSeenAPI(token, idMovie) {
  return Axios({
    method: 'post',
    url: `${API}:3000/movie/seen`,
    data: {
      movieId: idMovie,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
