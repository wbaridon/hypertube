import {
  EMPTY_MOVIE_DATA,
} from './action-types';

export const emptyMovieStart = () => ({
  type: EMPTY_MOVIE_DATA,
});

export const emptyMovieDataA = () => {
  return (dispatch) => {
    dispatch(emptyMovieStart());
  };
};
