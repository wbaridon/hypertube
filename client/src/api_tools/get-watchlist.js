import Axios from 'axios';

export default function getWatchListAPI(token) {
  return Axios({
    method: 'get',
    url: `${API}:3000/watchList/getList`,
    data: {
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: TIMEOUT_API,
  });
}
