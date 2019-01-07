import resetPasswordAPI from 'API/reset-password';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './action-types';
import { setError } from '.';

export const resetPasswordStart = () => ({
  type: RESET_PASSWORD,
});

export const resetPasswordSuccess = result => ({
  type: RESET_PASSWORD_SUCCESS,
  result,
});

export const resetPasswordError = () => ({
  type: RESET_PASSWORD_ERROR,
});

export const resetPassword = (newPassword, token) => {
  return (dispatch) => {
    dispatch(resetPasswordStart());
    return resetPasswordAPI(newPassword, token)
      .then(
        result => dispatch(resetPasswordSuccess(result)),
        (error) => {
          dispatch(setError(error.message));
          dispatch(resetPasswordError());
        },
      );
  };
};
