import movieAPI from 'API/get-movie-data';
import {
  UPDATE_WATCHLIST,
  UPDATE_WATCHLIST_SUCCESS,
  UPDATE_WATCHLIST_ERROR,
} from './action-types';
import { setErrorA } from '.';
import { resolve } from 'q';

export const updateWatchListStart = () => ({
  type: UPDATE_WATCHLIST,
});

export const updateWatchListSuccess = result => ({
  type: UPDATE_WATCHLIST_SUCCESS,
  result,
});

export const updateWatchListError = () => ({
  type: UPDATE_WATCHLIST_ERROR,
});

export const updateWatchListA = (idMovie, token) => {
  console.log(idMovie);
  console.log(token);
  return (dispatch) => {
    dispatch(updateWatchListStart(idMovie));
    return movieAPI(idMovie, token)
      .then(
        (response) => {
          dispatch(updateWatchListSuccess(idMovie, response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response.data));
          dispatch(updateWatchListError(idMovie));
        },
      );
  };
};
