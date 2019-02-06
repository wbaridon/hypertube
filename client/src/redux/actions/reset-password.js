import resetPasswordAPI from 'API/reset-password';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './action-types';
import { setErrorA } from '.';

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

export const resetPasswordA = (key, newPassword, newPasswordRepeat, email) => {
  return (dispatch) => {
    dispatch(resetPasswordStart());
    return resetPasswordAPI(key, newPassword, newPasswordRepeat, email)
      .then(
        result => dispatch(resetPasswordSuccess(result)),
        (error) => {
          dispatch(setErrorA(error.response.data));
          dispatch(resetPasswordError());
        },
      );
  };
};
