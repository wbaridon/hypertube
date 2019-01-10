import userInfoPrivateAPI from 'API/user-info-private';
import {
  GET_USER_INFO_PRIVATE,
  GET_USER_INFO_PRIVATE_SUCCESS,
  GET_USER_INFO_PRIVATE_ERROR,
} from './action-types';
import { setUserA, setErrorA } from '.';

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

export const getUserInfoPrivateA = (token, dispatch) => new Promise((resolve, reject) => {
  dispatch(getUserInfoPrivateStart());
  return userInfoPrivateAPI(token)
    .then(
      (response) => {
        dispatch(getUserInfoPrivateSuccess(response.data));
        dispatch(setUserA(response.data));
        resolve();
      },
      (error) => {
        dispatch(setErrorA(error.message));
        dispatch(getUserInfoPrivateError());
        reject();
      },
    );
});
