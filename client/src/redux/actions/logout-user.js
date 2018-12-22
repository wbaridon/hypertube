import logoutUserAPI from 'API/logout-user';
import { deleteUserFromCookieThunk, clearUser } from './index';
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

export const logoutUser = (token) => {
  return (dispatch) => {
    dispatch(logoutUserStart());
    dispatch(deleteUserFromCookieThunk());
    dispatch(clearUser());
    return logoutUserAPI(token)
      .then(
        result => dispatch(logoutUserSuccess(result)),
        error => dispatch(logoutUserError(error)),
      );
  };
};
