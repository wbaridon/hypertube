import movieAPI from 'API/get-movie-data';
import {
  UPDATE_WATCHLIST,
  UPDATE_WATCHLIST_SUCCESS,
  UPDATE_WATCHLIST_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const updateWatchListStart = idMovie => ({
  type: UPDATE_WATCHLIST,
  idMovie,
});

export const updateWatchListSuccess = (idMovie, movieData) => ({
  type: UPDATE_WATCHLIST_SUCCESS,
  idMovie,
  movieData,
});

export const updateWatchListError = idMovie => ({
  type: UPDATE_WATCHLIST_ERROR,
  idMovie,
});

export const updateWatchListA = (idMovie, token) => {
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
