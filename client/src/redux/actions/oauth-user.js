import oAuthUserAPI from 'API/oauth-user';
import {
  OAUTH_USER,
  OAUTH_USER_SUCCESS,
  OAUTH_USER_ERROR,
} from './action-types';

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
        },
        error => dispatch(oAuthUserError(error)),
      );
  };
};
