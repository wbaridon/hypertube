import Axios from 'axios';

export default function addWatchlisttAPI(token, idMovie) {
  return Axios({
    method: 'post',
    url: 'http://localhost:3000/watchList/add',
    data: {
      idMovie,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
