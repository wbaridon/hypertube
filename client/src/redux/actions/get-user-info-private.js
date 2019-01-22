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

export const getUserInfoPrivateSuccess = () => ({
  type: GET_USER_INFO_PRIVATE_SUCCESS,
});

export const getUserInfoPrivateError = () => ({
  type: GET_USER_INFO_PRIVATE_ERROR,
});

export const getUserInfoPrivateA = (token, dispatch) => {
  dispatch(getUserInfoPrivateStart());
  return userInfoPrivateAPI(token)
    .then(
      (response) => {
        dispatch(getUserInfoPrivateSuccess());
        dispatch(setUserA(response.data, token));
      },
      (error) => {
        dispatch(setErrorA(error.message));
        dispatch(getUserInfoPrivateError());
      },
    );
};
