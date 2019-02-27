import {
  GET_MOVIE_DATA,
  GET_MOVIE_DATA_SUCCESS,
  GET_MOVIE_DATA_ERROR,
  EMPTY_MOVIE_DATA,
  GET_MOVIE_SUBTITLES,
  GET_MOVIE_SUBTITLES_SUCCESS,
  GET_MOVIE_SUBTITLES_ERROR,
} from 'Actions/action-types';

const defaultGetMovieState = {
  loading: false,
  success: false,
  seen: false,
  data: null,
};

export default function movie(state = defaultGetMovieState, action) {
  switch (action.type) {
    case EMPTY_MOVIE_DATA:
      return {
        ...state,
        data: null,
      };
    case GET_MOVIE_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.movie,
      };
    case GET_MOVIE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        data: { error: true },
      };
    case GET_MOVIE_SUBTITLES:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE_SUBTITLES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        subtitles: action.movie,
      };
    case GET_MOVIE_SUBTITLES_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        subtitles: null,
      };
    default:
      return state;
  }
}
