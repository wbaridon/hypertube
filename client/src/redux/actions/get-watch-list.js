import getWatchListAPI from 'API/get-watchlist';
import {
  GET_WATCHLIST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const getWatchListStart = () => ({
  type: GET_WATCHLIST,
});

export const getWatchListSuccess = result => ({
  type: GET_WATCHLIST_SUCCESS,
  result,
});

export const getWatchListError = () => ({
  type: GET_WATCHLIST_ERROR,
});

export const getWatchListA = (token) => {
  return (dispatch) => {
    dispatch(getWatchListStart());
    return getWatchListAPI(token)
      .then(
        (response) => {
          dispatch(getWatchListSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(getWatchListError());
        },
      );
  };
};
