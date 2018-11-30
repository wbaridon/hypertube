import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN,
} from 'Actions/action-types';

const defaultLoginState = {
  user: {},
  error: {},
};

export default function userLogin(state = defaultLoginState, action) {
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
    default:
      return state;
  }
}
