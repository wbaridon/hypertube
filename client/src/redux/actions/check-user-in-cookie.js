import {
  CHECK_USER_IN_COOKIE,
  CHECK_USER_IN_COOKIE_SUCCESS,
  CHECK_USER_IN_COOKIE_ERROR,
  DELETE_USER_FROM_COOKIE,
  NO_USER_IN_COOKIE,
} from './action-types';
import { getUserInfoPrivateA, protectedRouteFinishedA } from '.';

function readCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return '';
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
}
function deleteCookie(name) {
  setCookie(name, '', -1);
  return '';
}

export const deleteUserFromCookie = () => ({
  type: DELETE_USER_FROM_COOKIE,
});

export const deleteUserFromCookieThunkA = () => {
  return (dispatch) => {
    deleteCookie('userToken');
    dispatch(deleteUserFromCookie());
  };
};

export const noUserInCookie = () => ({
  type: NO_USER_IN_COOKIE,
});

export const checkUserInCookieError = () => ({
  type: CHECK_USER_IN_COOKIE_ERROR,
});

export const checkUserInCookieSuccess = token => ({
  type: CHECK_USER_IN_COOKIE_SUCCESS,
  token,
});

export const checkUserInCookieStart = () => ({
  type: CHECK_USER_IN_COOKIE,
});

export const checkUserInCookieA = (cookie) => {
  return (dispatch) => {
    dispatch(checkUserInCookieStart());
    const token = readCookie('userToken', cookie);
    if (token) {
      getUserInfoPrivateA(token, dispatch)
        .then(
          () => {
            dispatch(checkUserInCookieSuccess(token));
            dispatch(protectedRouteFinishedA());
          },
          () => {
            deleteCookie('userToken');
            dispatch(checkUserInCookieError());
            dispatch(protectedRouteFinishedA());
          },
        );
    } else {
      dispatch(noUserInCookie());
      dispatch(protectedRouteFinishedA());
    }
  };
};
