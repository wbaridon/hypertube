import Axios from 'axios';

export default function movieAPI(movieId, token) {
  return Axios({
    method: 'post',
    url: `${API}:3000/movie/getMovie`,
    data: {
      id: movieId,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
