import {
  GET_MOVIE_DATA,
  GET_MOVIE_DATA_SUCCESS,
  GET_MOVIE_DATA_ERROR,
} from 'Actions/action-types';

const defaultGetMovieState = {
  loading: false,
  success: false,
  data: null,
};

export default function movie(state = defaultGetMovieState, action) {
  switch (action.type) {
    case GET_MOVIE_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.movie,
      };
    case GET_MOVIE_DATA_ERROR:
      return defaultGetMovieState;
    default:
      return state;
  }
}