import addWatchListAPI from 'API/add-watchlist';
import {
  ADD_WATCHLIST,
  ADD_WATCHLIST_SUCCESS,
  ADD_WATCHLIST_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const addWatchListStart = () => ({
  type: ADD_WATCHLIST,
});

export const addWatchListSuccess = result => ({
  type: ADD_WATCHLIST_SUCCESS,
  result,
});

export const addWatchListError = () => ({
  type: ADD_WATCHLIST_ERROR,
});

export const addWatchListA = (token, idMovie) => {
  return (dispatch) => {
    dispatch(addWatchListStart());
    return addWatchListAPI(token, idMovie)
      .then(
        (response) => {
          dispatch(addWatchListSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(addWatchListError());
        },
      );
  };
};
