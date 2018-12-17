import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  CHECK_USER_IN_COOKIE,
  DELETE_USER_FROM_COOKIE,
  GET_USER_INFO_PRIVATE,
  GET_USER_INFO_PRIVATE_SUCCESS,
  GET_USER_INFO_PRIVATE_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER,
  REGISTER_OAUTH,
  REGISTER_OAUTH_SUCCESS,
  REGISTER_OAUTH_ERROR,
  SET_ERROR,
  CLEAR_ERROR,
} from 'Actions/action-types';

const defaultUserState = {
  user: null,
  data: null,
  error: null,
  registerData: {
    exists: false,
  },
  token: '',
  lastAction: '',
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
    case LOGIN:
      return {
        ...state,
        lastAction: action.type,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        lastAction: action.type,
        token: action.result.token,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: action.error.response ? action.error.response.data.error : action.error.message,
      };
    case LOGOUT:
      return {
        ...state,
        lastAction: action.type,
      };
    case LOGOUT_SUCCESS:
      return {
        ...defaultUserState,
        lastAction: action.type,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: action.error.response.data.error,
      };
    case CHECK_USER_IN_COOKIE:
      return {
        ...state,
        token: readCookie('userToken', action.cookie),
        lastAction: action.type,
      };
    case DELETE_USER_FROM_COOKIE:
      return {
        ...state,
        token: deleteCookie('userToken'),
        lastAction: action.type,
      };
    case GET_USER_INFO_PRIVATE:
      return {
        ...state,
        lastAction: action.type,
      };
    case GET_USER_INFO_PRIVATE_SUCCESS:
      return {
        ...state,
        lastAction: action.type,
        data: action.data,
      };
    case GET_USER_INFO_PRIVATE_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: action.error.response ? action.error.response.data.error : action.error.message,
        token: deleteCookie('userToken'),
      };
    case REGISTER:
      return {
        ...state,
        lastAction: action.type,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        lastAction: action.type,
        data: action.result,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: action.error.response.data.error,
      };
    case REGISTER_OAUTH:
      return {
        ...state,
        lastAction: action.type,
      };
    case REGISTER_OAUTH_SUCCESS:
      return {
        ...state,
        lastAction: action.type,
        registerData: {
          email: action.result.email,
          userName: action.result.login,
          imageUrl: action.result.picture,
          firstName: action.result.firstname,
          lastName: action.result.name,
          exists: true,
        },
      };
    case REGISTER_OAUTH_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: action.error.response ? action.error.response.data.error : action.error.message,
        registerData: {
          exists: false,
        },
      };
    case SET_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: null,
      };
    default:
      return state;
  }
}
