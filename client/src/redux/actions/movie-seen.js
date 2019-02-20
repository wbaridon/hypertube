import movieSeenAPI from 'API/movie-seen';
import {
  MOVIE_SEEN,
  MOVIE_SEEN_SUCCESS,
  MOVIE_SEEN_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const seenStart = () => ({
  type: MOVIE_SEEN,
});

export const seenSuccess = result => ({
  type: MOVIE_SEEN_SUCCESS,
  result,
});

export const seenError = () => ({
  type: MOVIE_SEEN_ERROR,
});

export const movieSeenA = (token, idMovie) => {
  return (dispatch) => {
    dispatch(seenStart());
    return movieSeenAPI(token, idMovie)
      .then(
        (response) => {
          dispatch(seenSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(seenError());
        },
      );
  };
};
