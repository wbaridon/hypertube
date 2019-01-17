import {
  CHANGE_USER_PASSWORD,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_ERROR,
} from 'Actions/action-types';

const defaultchangeUserPasswordState = {
  loading: false,
  success: false,
};

export default function changeUserPassword(state = defaultchangeUserPasswordState, action) {
  switch (action.type) {
    case CHANGE_USER_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_USER_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CHANGE_USER_PASSWORD_ERROR:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
}
