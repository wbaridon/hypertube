import {
  CLEAR_REGISTER_DATA,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER,
} from 'Actions/action-types';

const defaultRegisterState = {
  loading: false,
  success: false,
  registerData: {
    exists: false,
  },
};


export default function registerUser(state = defaultRegisterState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case CLEAR_REGISTER_DATA:
      return {
        ...state,
        registerData: {
          exists: false,
        },
      };
    default:
      return state;
  }
}
