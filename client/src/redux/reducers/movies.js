import {
  GET_MOVIE_PAGE,
  GET_MOVIE_PAGE_SUCCESS,
  GET_MOVIE_PAGE_ERROR,
  CLEAR_MOVIES,
} from 'Actions/action-types';

const defaultMoviesState = {
  movies: [],
  currentPage: 0,
  pageSize: 5,
  loading: false,
  noMoreMovies: false,
};

export default function movies(state = defaultMoviesState, action) {
  switch (action.type) {
    case GET_MOVIE_PAGE:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE_PAGE_SUCCESS:
      return {
        ...state,
        movies: state.movies.concat(action.movies),
        currentPage: state.currentPage + 1,
        loading: false,
        noMoreMovies: action.movies.length === 0,
      };
    case GET_MOVIE_PAGE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        currentPage: 0,
        movies: [],
        noMoreMovies: false,
        loading: false,
      };
    default:
      return state;
  }
}
