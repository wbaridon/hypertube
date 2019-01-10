import updateUserImageAPI from 'API/update-user-image';
import {
  UPDATE_USER_IMAGE,
  UPDATE_USER_IMAGE_SUCCESS,
  UPDATE_USER_IMAGE_ERROR,
} from './action-types';
import { setError } from '.';

export const updateUserImageStart = () => ({
  type: UPDATE_USER_IMAGE,
});

export const updateUserImageSuccess = result => ({
  type: UPDATE_USER_IMAGE_SUCCESS,
  result,
});

export const updateUserImageError = () => ({
  type: UPDATE_USER_IMAGE_ERROR,
});

export const updateUserImage = (form) => {
  return (dispatch) => {
    dispatch(updateUserImageStart());
    return updateUserImageAPI(form)
      .then(
        result => dispatch(updateUserImageSuccess(result)),
        (error) => {
          dispatch(setError(error.message));
          dispatch(updateUserImageError());
        },
      );
  };
};
