import logoutUserAPI from 'API/logout-user';
import { deleteUserFromCookieThunkA, clearUserA, setErrorA } from './index';
import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './action-types';

export const logoutUserStart = () => ({
  type: LOGOUT,
});

export const logoutUserSuccess = result => ({
  type: LOGOUT_SUCCESS,
  result,
});

export const logoutUserError = error => ({
  type: LOGOUT_ERROR,
  error,
});

export const logoutUserA = (token) => {
  return (dispatch) => {
    dispatch(logoutUserStart());
    dispatch(deleteUserFromCookieThunkA());
    dispatch(clearUserA());
    return logoutUserAPI(token)
      .then(
        result => dispatch(logoutUserSuccess(result)),
        error => dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb')),
      );
  };
};
