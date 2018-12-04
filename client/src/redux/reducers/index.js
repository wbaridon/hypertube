import { combineReducers } from 'redux';
import {
  generateInProgressActionTypeName,
  generateSuccessActionTypeName,
  generateErrorActionTypeName,
} from 'redux-minimal-code-async-actions';
import {
  SET_LOCALE,
  LOGOUT_USER,
  TOGGLE_DARK_THEME,
  CHECK_USER_IN_COOKIE,
  GET_USER_INFO_PRIVATE,
  POPULATE_USER,
} from '../actions/action-types';
import loginUser from './login-user';
import registerUser from './register-user';

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

const darkTheme = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_DARK_THEME:
      return !state;
    default:
      return state;
  }
};

const locale = (state = 'en', action) => {
  switch (action.type) {
    case SET_LOCALE:
      return action.locale;
    default:
      return state;
  }
};

const defaultUserState = {
  loggedIn: 'false',
  lastAction: '',
  data: {},
  error: {},
  token: '',
};

const user = (state = defaultUserState, action) => {
  switch (action.type) {
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
    case generateInProgressActionTypeName(GET_USER_INFO_PRIVATE):
      return {
        ...state,
        lastAction: action.type,
      };
    case generateSuccessActionTypeName(GET_USER_INFO_PRIVATE):
      return {
        ...state,
        loggedIn: 'true',
        data: action.data,
        lastAction: action.type,
      };
    case generateErrorActionTypeName(GET_USER_INFO_PRIVATE):
      return {
        ...state,
        error: action.err.response.data,
        response: null,
        lastAction: action.type,
      };
    default:
      return state;
  }
};

export default combineReducers({
  locale,
  user,
  darkTheme,
  loginUser,
  registerUser,
});
