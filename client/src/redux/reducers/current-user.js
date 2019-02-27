import {
  CHECK_USER_IN_COOKIE,
  CHECK_USER_IN_COOKIE_SUCCESS,
  CHECK_USER_IN_COOKIE_ERROR,
  DELETE_USER_FROM_COOKIE,
  GET_USER_INFO_PRIVATE,
  GET_USER_INFO_PRIVATE_SUCCESS,
  GET_USER_INFO_PRIVATE_ERROR,
  SET_USER,
  CHANGE_USER_VALUE,
  CLEAR_USER,
  SET_MOBILE_BOOLEAN,
  UPDATE_USER_TOKEN,
} from 'Actions/action-types';

const defaultUserState = {
  data: {
    locale: null,
    darkTheme: null,
  },
  tokenFetched: false,
  tokenValid: false,
  dataFetched: false,
  token: null,
  isMobile: '',
};

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        dataFetched: true,
        data: action.data,
        token: action.token,
      };
    case CHANGE_USER_VALUE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
      };
    case CLEAR_USER:
      return defaultUserState;
    case CHECK_USER_IN_COOKIE:
      return {
        ...state,
      };
    case CHECK_USER_IN_COOKIE_SUCCESS:
      return {
        ...state,
        tokenFetched: true,
        token: action.token,
      };
    case CHECK_USER_IN_COOKIE_ERROR:
      return {
        ...state,
        tokenFetched: false,
      };
    case DELETE_USER_FROM_COOKIE:
      return {
        ...state,
      };
    case GET_USER_INFO_PRIVATE:
      return {
        ...state,
      };
    case GET_USER_INFO_PRIVATE_SUCCESS:
      return {
        ...state,
        tokenValid: true,
      };
    case GET_USER_INFO_PRIVATE_ERROR:
      return {
        ...state,
        tokenValid: false,
      };
    case SET_MOBILE_BOOLEAN:
      return {
        ...state,
        isMobile: action.isMobile !== null ? action.isMobile : false,
      };
    case UPDATE_USER_TOKEN:
      return {
        ...state,
        token: action.token,
        tokenValid: true,
      };
    default:
      return state;
  }
}
