import Axios from 'axios';

export default function movieAPI(movieId) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/movie/testgetMovie',
    data: {
      movieId,
    },
    timeout: TIMEOUT_API,
  });
}
