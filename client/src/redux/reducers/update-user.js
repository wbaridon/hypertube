import {
  UPDATE_USER_FIELD,
  UPDATE_USER_FIELD_SUCCESS,
  UPDATE_USER_FIELD_ERROR,
  CLEAR_USER_FIELD_ERROR,
} from 'Actions/action-types';

const defaultUpdateUserState = {
  loading: false,
  success: false,
  field: null,
  value: null,
  errorMessage: null,
};

export default function updateUser(state = defaultUpdateUserState, action) {
  switch (action.type) {
    case UPDATE_USER_FIELD:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_FIELD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_USER_FIELD_ERROR:
      return {
        loading: false,
        success: false,
        errorMessage: action.errorMessage,
        field: action.field,
        value: action.value,
      };
    case CLEAR_USER_FIELD_ERROR:
      return {
        ...state,
        errorMessage: null,
        field: null,
        value: null,
      };
    default:
      return state;
  }
}
