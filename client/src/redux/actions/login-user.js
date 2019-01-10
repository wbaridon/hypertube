import loginUserAPI from 'API/login-user';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './action-types';
import {
  getUserInfoPrivateA,
  setErrorA,
  setSuccessA,
  protectedRouteFinishedA,
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
    dispatch(setErrorA(errorString));
    return dispatch(loginUserErrorAction());
  };
};

export const postLoginUserSuccess = (result) => {
  return (dispatch) => {
    return getUserInfoPrivateA(result.token, dispatch).then(
      () => {
        dispatch(setSuccessA('success.login'));
        dispatch(loginUserSuccess());
        dispatch(protectedRouteFinishedA());
      },
      () => {
        dispatch(loginUserError());
        dispatch(protectedRouteFinishedA());
      },
    );
  };
};

export const loginUserA = (user) => {
  return (dispatch) => {
    dispatch(loginUserStart());
    return loginUserAPI(user)
      .then(
        (result) => {
          createCookie('userToken', result.data.token, 7);
          dispatch(postLoginUserSuccess(result.data));
        },
        error => dispatch(loginUserError(error)),
      );
  };
};
