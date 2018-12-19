import loginUserAPI from 'API/login-user';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './action-types';

export const loginUserStart = () => ({
  type: LOGIN,
});

export const loginUserSuccess = result => ({
  type: LOGIN_SUCCESS,
  result,
});

export const loginUserError = error => ({
  type: LOGIN_ERROR,
  error,
});


function createCookie(name, value, days) {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  } else expires = '';
  document.cookie = `${name}=${value}${expires}; path=/`;
}

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch(loginUserStart());
    return loginUserAPI(user)
      .then(
        (result) => {
          createCookie('userToken', result.data.token, 7);
          dispatch(loginUserSuccess(result.data));
        },
        error => dispatch(loginUserError(error)),
      );
  };
};