import { combineReducers } from 'redux';
import {
  generateInProgressActionTypeName,
  generateSuccessActionTypeName,
  generateErrorActionTypeName,
} from 'redux-minimal-code-async-actions';
import { SET_LOCALE, REGISTER_USER } from '../actions/action-types';

const locale = (state = 'en', action) => {
  switch (action.type) {
    case SET_LOCALE:
      return action.locale;
    default:
      return state;
  }
};

const defaultUserState = {
  loading: false,
  response: null,
  error: {},
};

const registerUser = (state = defaultUserState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return state;
    case generateInProgressActionTypeName(REGISTER_USER):
      return {
        ...state,
        loading: true,
      };
    case generateSuccessActionTypeName(REGISTER_USER):
      return {
        ...state,
        loading: false,
        response: action,
      };
    case generateErrorActionTypeName(REGISTER_USER):
      return {
        ...state,
        error: action.err.response.data,
        loading: false,
        response: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  locale,
  registerUser,
});
