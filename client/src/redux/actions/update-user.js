import updateUserAPI from 'API/update-user';
import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from './action-types';
import { setError } from '.';

export const updateUserStart = () => ({
  type: UPDATE_USER,
});

export const updateUserSuccess = result => ({
  type: UPDATE_USER_SUCCESS,
  result,
});

export const updateUserError = () => ({
  type: UPDATE_USER_ERROR,
});

export const updateUser = (token, changes) => {
  return (dispatch) => {
    dispatch(updateUserStart());
    return updateUserAPI(token, changes)
      .then(
        result => dispatch(updateUserSuccess(result)),
        (error) => {
          dispatch(setError(error.message));
          dispatch(updateUserError());
        },
      );
  };
};
