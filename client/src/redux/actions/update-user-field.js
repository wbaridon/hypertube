import updateUserFieldAPI from 'API/update-user-field';
import {
  UPDATE_USER_FIELD,
  UPDATE_USER_FIELD_SUCCESS,
  UPDATE_USER_FIELD_ERROR,
} from './action-types';
import { setErrorA, changeUserValueA } from '.';

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

export const updateUserFieldA = (token, field, value) => {
  return (dispatch) => {
    dispatch(updateUserFieldStart());
    return updateUserFieldAPI(token, field, value)
      .then(
        (result) => {
          dispatch(updateUserFieldSuccess(result));
          dispatch(changeUserValueA(field, value));
        },
        (error) => {
          dispatch(setErrorA(error.message));
          dispatch(updateUserFieldError());
        },
      );
  };
};
