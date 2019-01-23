import Axios from 'axios';

export default function getMoviePageAPI(token, request) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/movie/list',
    data: {
      ...request,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
