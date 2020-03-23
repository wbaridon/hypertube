import Axios from 'axios';

export default function addWatchListAPI(token, idMovie) {
  return Axios({
    method: 'post',
    url: `${API}:3000/watchList/add`,
    data: {
      movieId: idMovie,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
