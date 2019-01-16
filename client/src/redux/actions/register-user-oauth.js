import registerUseroAuthAPI from 'API/register-user-oauth';
import {
  REGISTER_OAUTH,
  REGISTER_OAUTH_SUCCESS,
  REGISTER_OAUTH_ERROR,
} from './action-types';

export const registerUserOauthStart = () => ({
  type: REGISTER_OAUTH,
});

export const registerUserOauthSuccess = result => ({
  type: REGISTER_OAUTH_SUCCESS,
  result,
});

export const registerUserOauthError = error => ({
  type: REGISTER_OAUTH_ERROR,
  error,
});

export const registerUserOauthA = (provider, code) => {
  return (dispatch) => {
    dispatch(registerUserOauthStart());
    return registerUseroAuthAPI(provider, code)
      .then(
        (result) => {
          dispatch(registerUserOauthSuccess(result.data));
        },
        error => dispatch(registerUserOauthError(error)),
      );
  };
};
