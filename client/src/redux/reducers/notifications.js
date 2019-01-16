import {
  SET_ERROR,
  SET_SUCCESS,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from 'Actions/action-types';


const defaultNotificationState = {
  error: null,
  success: null,
  data: null,
};

export default function notifications(state = defaultNotificationState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        data: action.data,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        data: null,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.success,
        data: action.data,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
        data: null,
      };
    default:
      return state;
  }
}
