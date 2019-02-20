import movieAPI from 'API/get-movie-data';
import {
  GET_MOVIE_DATA,
  GET_MOVIE_DATA_SUCCESS,
  GET_MOVIE_DATA_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const getMovieStart = () => ({
  type: GET_MOVIE_DATA,
});

export const getMovieSuccess = movie => ({
  type: GET_MOVIE_DATA_SUCCESS,
  movie,
});

export const getMovieError = () => ({
  type: GET_MOVIE_DATA_ERROR,
});

export const getMovieDataA = (idMovie, token) => {
  return (dispatch) => {
    dispatch(getMovieStart());
    return movieAPI(idMovie, token)
      .then(
        (response) => {
          dispatch(getMovieSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(getMovieError());
        },
      );
  };
};
