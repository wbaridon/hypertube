import updateUserImageAPI from 'API/update-user-image';
import {
  UPDATE_USER_IMAGE,
  UPDATE_USER_IMAGE_SUCCESS,
  UPDATE_USER_IMAGE_ERROR,
} from './action-types';
import { setErrorA, changeUserValueA, deleteUserFromUserListA } from '.';

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

export const updateUserImageA = (token, form) => {
  return (dispatch) => {
    dispatch(updateUserImageStart());
    return updateUserImageAPI(token, form)
      .then(
        (result) => {
          console.log(result);
          dispatch(changeUserValueA('picture', result.data.picture));
          dispatch(deleteUserFromUserListA(result.data.user));
          dispatch(updateUserImageSuccess(result));
        },
        (error) => {
          dispatch(setErrorA(error.message));
          dispatch(updateUserImageError());
        },
      );
  };
};
