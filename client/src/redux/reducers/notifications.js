import {
  SET_ERROR,
  SET_SUCCESS,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from 'Actions/action-types';


const defaultNotificationState = {
  error: null,
  success: null,
};

export default function notifications(state = defaultNotificationState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.success,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
}
