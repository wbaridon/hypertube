import getSubtitlesAPI from 'API/get-subtitles';
import {
  GET_MOVIE_SUBTITLES,
  GET_MOVIE_SUBTITLES_SUCCESS,
  GET_MOVIE_SUBTITLES_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const getSubtitlesStart = () => ({
  type: GET_MOVIE_SUBTITLES,
});

export const getSubtitlesSuccess = movie => ({
  type: GET_MOVIE_SUBTITLES_SUCCESS,
  movie,
});

export const getSubtitlesError = () => ({
  type: GET_MOVIE_SUBTITLES_ERROR,
});

export const getSubtitlesA = (idMovie, token) => {
  return (dispatch) => {
    dispatch(getSubtitlesStart());
    return getSubtitlesAPI(idMovie, token)
      .then(
        (response) => {
          dispatch(getSubtitlesSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(getSubtitlesError());
        },
      );
  };
};
