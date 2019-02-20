import getUserInfoAPI from 'API/get-user-info';
import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const getUserInfoStart = userName => ({
  type: GET_USER_INFO,
  userName,
});

export const getUserInfoSuccess = (userName, user) => ({
  type: GET_USER_INFO_SUCCESS,
  userName,
  user,
});

export const getUserInfoError = userName => ({
  type: GET_USER_INFO_ERROR,
  userName,
});

export const getUserInfoA = (token, userName, dispatch) => new Promise((resolve, reject) => {
  dispatch(getUserInfoStart(userName));
  return getUserInfoAPI(token, userName)
    .then(
      (response) => {
        dispatch(getUserInfoSuccess(userName, response.data));
        resolve();
      },
      (error) => {
        dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
        dispatch(getUserInfoError(userName));
        reject();
      },
    );
});
