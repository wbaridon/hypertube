import {
  CLEAR_REGISTER_DATA,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER,
  REGISTER_OAUTH,
  REGISTER_OAUTH_SUCCESS,
  REGISTER_OAUTH_ERROR,
} from 'Actions/action-types';

const defaultRegisterState = {
  loading: false,
  success: false,
  provided: false,
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
        success: true,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case REGISTER_OAUTH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case REGISTER_OAUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        provided: true,
        registerData: {
          email: action.result.email,
          userName: action.result.login,
          imageUrl: action.result.picture,
          firstName: action.result.firstname,
          lastName: action.result.name,
          exists: true,
        },
      };
    case CLEAR_REGISTER_DATA:
      return {
        ...state,
        registerData: {
          exists: false,
        },
      };
    case REGISTER_OAUTH_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        provided: false,
        registerData: {
          exists: false,
        },
      };
    default:
      return state;
  }
}
