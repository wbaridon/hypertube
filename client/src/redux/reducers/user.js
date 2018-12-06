import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN,
  LOGOUT_USER,
  CHECK_USER_IN_COOKIE,
  GET_USER_INFO_PRIVATE,
  GET_USER_INFO_PRIVATE_SUCCESS,
  GET_USER_INFO_PRIVATE_ERROR,
  POPULATE_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER,
} from 'Actions/action-types';

const defaultUserState = {
  user: null,
  data: null,
  error: null,
  registerData: null,
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

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case LOGIN:
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        lastAction: action.type,
        user: action.result,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: action.error,
      };
    case LOGOUT_USER:
      return {
        ...defaultUserState,
        lastAction: action.type,
      };
    case CHECK_USER_IN_COOKIE:
      return {
        ...state,
        token: readCookie('userToken', action.cookie),
        lastAction: action.type,
      };
    case POPULATE_USER:
      return {
        ...state,
        lastAction: action.type,
        loggedIn: 'true',
        data: action.data,
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
        error: action.error,
      };
    case REGISTER:
      return state;
    case REGISTER_SUCCESS:
      return {
        ...state,
        lastAction: action.type,
        registerData: action.result,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        lastAction: action.type,
        error: action.error,
      };
    default:
      return state;
  }
}
