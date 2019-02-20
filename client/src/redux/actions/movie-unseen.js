import movieUnseenAPI from 'API/movie-unseen';
import {
  MOVIE_UNSEEN,
  MOVIE_UNSEEN_SUCCESS,
  MOVIE_UNSEEN_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const unseenStart = () => ({
  type: MOVIE_UNSEEN,
});

export const unseenSuccess = result => ({
  type: MOVIE_UNSEEN_SUCCESS,
  result,
});

export const unseenError = () => ({
  type: MOVIE_UNSEEN_ERROR,
});

export const movieUnseenA = (token, idMovie) => {
  return (dispatch) => {
    dispatch(unseenStart());
    return movieUnseenAPI(token, idMovie)
      .then(
        (response) => {
          dispatch(unseenSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(unseenError());
        },
      );
  };
};
