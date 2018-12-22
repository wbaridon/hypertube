import {
  CHECK_USER_IN_COOKIE,
  DELETE_USER_FROM_COOKIE,
  GET_USER_INFO_PRIVATE,
  GET_USER_INFO_PRIVATE_SUCCESS,
  GET_USER_INFO_PRIVATE_ERROR,
  SET_USER,
  CLEAR_USER,
} from 'Actions/action-types';

const defaultUserState = {
  data: null,
  tokenFetched: false,
  dataFetched: false,
  token: null,
};

function readCookie(name, cookieString) {
  const nameEQ = `${name}=`;
  const ca = cookieString.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return '';
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
}
function deleteCookie(name) {
  setCookie(name, '', -1);
  return '';
}

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        dataFetched: true,
        data: action.data,
      };
    case CLEAR_USER:
      return defaultUserState;
    case CHECK_USER_IN_COOKIE:
      return {
        ...state,
        tokenFetched: true,
        token: readCookie('userToken', action.cookie),
      };
    case DELETE_USER_FROM_COOKIE:
      return {
        ...state,
        token: deleteCookie('userToken'),
      };
    case GET_USER_INFO_PRIVATE:
      return {
        dataFetched: true,
        ...state,
      };
    case GET_USER_INFO_PRIVATE_SUCCESS:
      return {
        ...state,
        dataFetched: true,
        lastAction: action.type,
        tokenValid: true,
      };
    case GET_USER_INFO_PRIVATE_ERROR:
      return {
        ...state,
        error: action.error.response ? action.error.response.data.error : action.error.message,
        token: deleteCookie('userToken'),
        tokenValid: false,
      };

    default:
      return state;
  }
}
