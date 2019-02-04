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
} from 'Actions/action-types';

const defaultLoginState = {
  loading: false,
  success: false,
  errored: false,
  redirectUrl: null,
};

export default function loginUser(state = defaultLoginState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        errored: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        errored: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        errored: true,
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
        errored: false,
      };
    case OAUTH_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        errored: true,
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
    default:
      return state;
  }
}
