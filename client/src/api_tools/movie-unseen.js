import Axios from 'axios';

export default function movieUnseenAPI(token, idMovie) {
  return Axios({
    method: 'post',
    url: `${API}:3000/movie/unseen`,
    data: {
      movieId: idMovie,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
