import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from 'Actions/action-types';

const defaultUpdateUserState = {
  loading: false,
  success: false,
};

export default function updateUser(state = defaultUpdateUserState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_USER_ERROR:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
}
