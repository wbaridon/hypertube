import deleteWatchListAPI from 'API/delete-watchlist';
import {
  DELETE_WATCHLIST,
  DELETE_WATCHLIST_SUCCESS,
  DELETE_WATCHLIST_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const deleteWatchListStart = () => ({
  type: DELETE_WATCHLIST,
});

export const deleteWatchListSuccess = result => ({
  type: DELETE_WATCHLIST_SUCCESS,
  result,
});

export const deleteWatchListError = () => ({
  type: DELETE_WATCHLIST_ERROR,
});

export const deleteWatchListA = (token, idMovie) => {
  return (dispatch) => {
    dispatch(deleteWatchListStart());
    return deleteWatchListAPI(token, idMovie)
      .then(
        (response) => {
          dispatch(deleteWatchListSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(deleteWatchListError());
        },
      );
  };
};
