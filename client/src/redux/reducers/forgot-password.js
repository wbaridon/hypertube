import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from 'Actions/action-types';

const defaultForgotPasswordState = {
  loading: false,
  success: false,
};

export default function forgotPassword(state = defaultForgotPasswordState, action) {
  switch (action.type) {
    case SEND_EMAIL:
      return {
        ...state,
        loading: true,
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case SEND_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
}
