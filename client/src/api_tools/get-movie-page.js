import Axios from 'axios';

export default function getMoviePageAPI(token, page) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/movie/list',
    data: {
      page,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
