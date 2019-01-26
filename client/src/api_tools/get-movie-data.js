import Axios from 'axios';

export default function movieAPI(movieId) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/movie/getMovie',
    data: {
      id: movieId,
    },
    timeout: TIMEOUT_API,
  });
}
