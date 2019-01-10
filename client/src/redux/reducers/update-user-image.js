import {
  UPDATE_USER_IMAGE,
  UPDATE_USER_IMAGE_SUCCESS,
  UPDATE_USER_IMAGE_ERROR,
} from 'Actions/action-types';

const defaultUpdateUserImageState = {
  loading: false,
  success: false,
};

export default function updateUserImage(state = defaultUpdateUserImageState, action) {
  switch (action.type) {
    case UPDATE_USER_IMAGE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_IMAGE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_USER_IMAGE_ERROR:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
}
