import Axios from 'axios';

export default function deleteWatchListAPI(token, idMovie) {
  return Axios({
    method: 'post',
    url: `${API}:3000/watchList/delete`,
    data: {
      idMovie,
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
