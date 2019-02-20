import getMoviePageAPI from 'API/get-movie-page';
import {
  GET_MOVIE_PAGE,
  GET_MOVIE_PAGE_SUCCESS,
  GET_MOVIE_PAGE_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const getMoviePageStart = () => ({
  type: GET_MOVIE_PAGE,
});

export const getMoviePageSuccess = movies => ({
  type: GET_MOVIE_PAGE_SUCCESS,
  movies,
});

export const getMoviePageError = () => ({
  type: GET_MOVIE_PAGE_ERROR,
});

export const getMoviePageA = (token, request) => {
  return (dispatch) => {
    dispatch(getMoviePageStart());
    return getMoviePageAPI(token, request)
      .then(
        (response) => {
          dispatch(getMoviePageSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(getMoviePageError());
        },
      );
  };
};
