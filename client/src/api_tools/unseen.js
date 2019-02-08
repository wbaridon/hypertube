import Axios from 'axios';

export default function unseenAPI(token, idMovie) {
  console.log(token);
  console.log(idMovie);
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/movie/unseen',
    data: {
      movieId: idMovie,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
