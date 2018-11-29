import { combineReducers } from 'redux';
import {
  generateInProgressActionTypeName,
  generateSuccessActionTypeName,
  generateErrorActionTypeName,
} from 'redux-minimal-code-async-actions';
import {
  SET_LOCALE,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  TOGGLE_DARK_THEME,
} from '../actions/action-types';

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
  response: null,
  loginState: 'dormant',
  error: {},
  token: null,
};

const user = (state = defaultUserState, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return state;
    case generateInProgressActionTypeName(LOGOUT_USER):
      return {
        ...state,
      };
    case generateSuccessActionTypeName(LOGOUT_USER):
      return {
        ...state,
        response: action,
      };
    case generateErrorActionTypeName(LOGOUT_USER):
      return {
        ...state,
        error: action.err.response.data,
        response: null,
      };
    case REGISTER_USER:
      return state;
    case generateInProgressActionTypeName(REGISTER_USER):
      return {
        ...state,
      };
    case generateSuccessActionTypeName(REGISTER_USER):
      return {
        ...state,
        response: action,
      };
    case generateErrorActionTypeName(REGISTER_USER):
      return {
        ...state,
        error: action.err.response.data,
        response: null,
      };
    case LOGIN_USER:
      return state;
    case generateInProgressActionTypeName(LOGIN_USER):
      return {
        ...state,
        loginState: action.type,
      };
    case generateSuccessActionTypeName(LOGIN_USER):
      return {
        ...state,
        loginState: action.type,
        response: action,
        token: action.data.token,
      };
    case generateErrorActionTypeName(LOGIN_USER):
      return {
        ...state,
        error: action.err,
        loginState: action.type,
        response: null,
      };
    default:
      return state;
  }
};

// const registerUser = (state = defaultUserState, action) => {
//   switch (action.type) {
//     case REGISTER_USER:
//       return state;
//     case generateInProgressActionTypeName(REGISTER_USER):
//       return {
//         ...state,
//       };
//     case generateSuccessActionTypeName(REGISTER_USER):
//       return {
//         ...state,
//         response: action,
//       };
//     case generateErrorActionTypeName(REGISTER_USER):
//       return {
//         ...state,
//         error: action.err.response.data,
//         response: null,
//       };
//     default:
//       return state;
//   }
// };

// const loginUser = (state = defaultUserState, action) => {
//   switch (action.type) {
//     case LOGIN_USER:
//       return state;
//     case generateInProgressActionTypeName(LOGIN_USER):
//       return {
//         ...state,
//         loginState: action.type,
//       };
//     case generateSuccessActionTypeName(LOGIN_USER):
//       return {
//         ...state,
//         loginState: action.type,
//         response: action,
//         token: action.data.token,
//       };
//     case generateErrorActionTypeName(LOGIN_USER):
//       return {
//         ...state,
//         error: action.err,
//         loginState: action.type,
//         response: null,
//       };
//     default:
//       return state;
//   }
// };

export default combineReducers({
  locale,
  user,
  darkTheme,
});
