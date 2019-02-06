import addWatchlistAPI from 'API/add-watchlist';
import {
  ADD_WATCHLIST,
  ADD_WATCHLIST_SUCCESS,
  ADD_WATCHLIST_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const addWatchlistStart = () => ({
  type: ADD_WATCHLIST,
});

export const addWatchlistSuccess = result => ({
  type: ADD_WATCHLIST_SUCCESS,
  result,
});

export const addWatchlistError = () => ({
  type: ADD_WATCHLIST_ERROR,
});

export const addWatchlistA = (token, idMovie) => {
  // console.log(token, comment, idMovie);
  return (dispatch) => {
    dispatch(addWatchlistStart());
    return addWatchlistAPI(token, idMovie)
      .then(
        (response) => {
          dispatch(addWatchlistSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response.data));
          dispatch(addWatchlistError());
        },
      );
  };
};
