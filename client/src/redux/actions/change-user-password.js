import changeUserPasswordAPI from 'API/change-user-password';
import {
  CHANGE_USER_PASSWORD,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_ERROR,
} from './action-types';
import { setErrorA, setSuccessA } from '.';

export const changeUserPasswordStart = () => ({
  type: CHANGE_USER_PASSWORD,
});

export const changeUserPasswordSuccess = result => ({
  type: CHANGE_USER_PASSWORD_SUCCESS,
  result,
});

export const changeUserPasswordError = () => ({
  type: CHANGE_USER_PASSWORD_ERROR,
});

export const changeUserPasswordA = (token, currentPassword, newPassword, newPasswordRepeat) => {
  return (dispatch) => {
    dispatch(changeUserPasswordStart());
    return changeUserPasswordAPI(token, 'password', currentPassword, newPassword, newPasswordRepeat)
      .then(
        (result) => {
          dispatch(setSuccessA('settings.changePassword.success'));
          dispatch(changeUserPasswordSuccess(result));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(changeUserPasswordError());
        },
      );
  };
};
