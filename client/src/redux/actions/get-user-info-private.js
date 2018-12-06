import userInfoPrivateAPI from 'API/user-info-private';
import {
  GET_USER_INFO_PRIVATE,
  GET_USER_INFO_PRIVATE_SUCCESS,
  GET_USER_INFO_PRIVATE_ERROR,
} from './action-types';

export const getUserInfoPrivateStart = () => ({
  type: GET_USER_INFO_PRIVATE,
});

export const getUserInfoPrivateSuccess = data => ({
  type: GET_USER_INFO_PRIVATE_SUCCESS,
  data,
});

export const getUserInfoPrivateError = error => ({
  type: GET_USER_INFO_PRIVATE_ERROR,
  error,
});

export const getUserInfoPrivate = (token) => {
  return (dispatch) => {
    dispatch(getUserInfoPrivateStart());
    return userInfoPrivateAPI(token)
      .then(
        data => dispatch(getUserInfoPrivateSuccess(data)),
        error => dispatch(getUserInfoPrivateError(error)),
      );
  };
};
