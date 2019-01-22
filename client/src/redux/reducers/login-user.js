import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  OAUTH_USER,
  OAUTH_USER_SUCCESS,
  OAUTH_USER_ERROR,
  READ_REDIRECT_URL_COOKIE,
  SET_REDIRECT_URL_COOKIE,
  CLEAR_REDIRECT_URL_COOKIE,
} from 'Actions/action-types';

function readCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
  return value;
}
function deleteCookie(name) {
  setCookie(name, '', -1);
  return null;
}

const defaultLoginState = {
  loading: false,
  success: false,
  redirectUrl: null,
};

export default function loginUser(state = defaultLoginState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case OAUTH_USER:
      return {
        ...state,
        loading: true,
      };
    case OAUTH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case OAUTH_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case LOGOUT:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      return {
        ...defaultLoginState,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
      };
    case READ_REDIRECT_URL_COOKIE:
      return {
        ...state,
        redirectUrl: readCookie('redirect'),
      }
    case SET_REDIRECT_URL_COOKIE:
      return {
        ...state,
        redirectUrl: setCookie('redirect', action.routeUrl, 1),
      };
    case CLEAR_REDIRECT_URL_COOKIE:
      return {
        ...state,
        redirectUrl: deleteCookie('redirect'),
      };
    default:
      return state;
  }
}
