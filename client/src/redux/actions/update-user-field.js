import updateUserFieldAPI from 'API/update-user-field';
import {
  UPDATE_USER_FIELD,
  UPDATE_USER_FIELD_SUCCESS,
  UPDATE_USER_FIELD_ERROR,
} from './action-types';
import { setError } from '.';

export const updateUserFieldStart = () => ({
  type: UPDATE_USER_FIELD,
});

export const updateUserFieldSuccess = result => ({
  type: UPDATE_USER_FIELD_SUCCESS,
  result,
});

export const updateUserFieldError = () => ({
  type: UPDATE_USER_FIELD_ERROR,
});

export const updateUserField = (token, changes) => {
  return (dispatch) => {
    dispatch(updateUserFieldStart());
    return updateUserFieldAPI(token, changes)
      .then(
        result => dispatch(updateUserFieldSuccess(result)),
        (error) => {
          dispatch(setError(error.message));
          dispatch(updateUserFieldError());
        },
      );
  };
};
