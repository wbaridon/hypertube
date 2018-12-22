import loginUserAPI from 'API/login-user';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './action-types';
import {
  getUserInfoPrivate,
  setError,
  setSuccess,
} from '.';

function createCookie(name, value, days) {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  } else expires = '';
  document.cookie = `${name}=${value}${expires}; path=/`;
}

export const loginUserStart = () => ({
  type: LOGIN,
});

export const loginUserSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginUserErrorAction = () => ({
  type: LOGIN_ERROR,
});

export const loginUserError = (error) => {
  return (dispatch) => {
    const errorString = error.message;
    dispatch(setError(errorString));
    return dispatch(loginUserErrorAction());
  };
};

export const postLoginUserSuccess = (result) => {
  return (dispatch) => {
    return getUserInfoPrivate(result.token, dispatch).then(
      () => {
        dispatch(setSuccess('login.success'));
      },
      () => dispatch(loginUserError()),
    );
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch(loginUserStart());
    return loginUserAPI(user)
      .then(
        (result) => {
          createCookie('userToken', result.data.token, 7);
          dispatch(loginUserSuccess());

          dispatch(postLoginUserSuccess(result.data));
        },
        error => dispatch(loginUserError(error)),
      );
  };
};
