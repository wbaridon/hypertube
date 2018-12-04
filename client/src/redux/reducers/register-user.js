import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER,
} from 'Actions/action-types';

const defaultRegisterState = {
  result: {},
  error: {},
};

export default function registerUser(state = defaultRegisterState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    case REGISTER_SUCCESS:
      return {
        ...state,
        lastAction: action.type,
        result: action.result,
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
