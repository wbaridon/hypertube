import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from 'Actions/action-types';

const defaultLoginState = {
  loading: false,
  success: false,
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
