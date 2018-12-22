import userInfoPrivateAPI from 'API/user-info-private';
import {
  GET_USER_INFO_PRIVATE,
  GET_USER_INFO_PRIVATE_SUCCESS,
  GET_USER_INFO_PRIVATE_ERROR,
} from './action-types';
import { setUser, setError } from '.';

export const getUserInfoPrivateStart = () => ({
  type: GET_USER_INFO_PRIVATE,
});

export const getUserInfoPrivateSuccess = data => ({
  type: GET_USER_INFO_PRIVATE_SUCCESS,
  data,
});

export const getUserInfoPrivateError = () => ({
  type: GET_USER_INFO_PRIVATE_ERROR,
});

export const getUserInfoPrivate = (token, dispatch) => new Promise((resolve, reject) => {
  dispatch(getUserInfoPrivateStart());
  return userInfoPrivateAPI(token)
    .then(
      (response) => {
        dispatch(getUserInfoPrivateSuccess(response.data));
        dispatch(setUser(response.data));
        resolve();
      },
      (error) => {
        dispatch(setError(error.message));
        dispatch(getUserInfoPrivateError());
        reject();
      },
    );
});
