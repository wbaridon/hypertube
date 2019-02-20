import userListAPI from 'API/user-list';
import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const getUserListStart = () => ({
  type: GET_USER_LIST,
});

export const getUserListSuccess = userList => ({
  type: GET_USER_LIST_SUCCESS,
  userList,
});

export const getUserListError = () => ({
  type: GET_USER_LIST_ERROR,
});

export const getUserListA = (token) => {
  return (dispatch) => {
    dispatch(getUserListStart());
    return userListAPI(token)
      .then(
        (response) => {
          dispatch(getUserListSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(getUserListError());
        },
      );
  };
};
