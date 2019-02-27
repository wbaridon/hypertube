import oAuthUserAPI from 'API/oauth-user';
import {
  OAUTH_USER,
  OAUTH_USER_SUCCESS,
  OAUTH_USER_ERROR,
} from './action-types';
import { getUserInfoPrivateA } from './get-user-info-private';
import { setErrorA } from '.';

function createCookie(name, value, days) {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  } else expires = '';
  document.cookie = `${name}=${value}${expires}; path=/`;
}

export const oAuthUserStart = () => ({
  type: OAUTH_USER,
});

export const oAuthUserSuccess = result => ({
  type: OAUTH_USER_SUCCESS,
  result,
});

export const oAuthUserError = error => ({
  type: OAUTH_USER_ERROR,
  error,
});

export const oAuthUserA = (provider, code) => {
  return (dispatch) => {
    dispatch(oAuthUserStart());
    return oAuthUserAPI(provider, code)
      .then(
        (result) => {
          dispatch(oAuthUserSuccess(result.data));
          createCookie('userToken', result.data.token, 7);
          getUserInfoPrivateA(result.data.token, dispatch);
        },
        (error) => {
          dispatch(oAuthUserError(error));
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
        },
      );
  };
};
