import {
  UPDATE_WATCHLIST,
  UPDATE_WATCHLIST_SUCCESS,
  UPDATE_WATCHLIST_ERROR,
  ADD_WATCHLIST,
  ADD_WATCHLIST_SUCCESS,
  ADD_WATCHLIST_ERROR,
  DELETE_WATCHLIST,
  DELETE_WATCHLIST_SUCCESS,
  DELETE_WATCHLIST_ERROR,
  GET_WATCHLIST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_ERROR,
} from 'Actions/action-types';

const defaultWatchListState = {
  loading: false,
  success: false,
};

export default function watchList(state = defaultWatchListState, action) {
  switch (action.type) {
    case ADD_WATCHLIST:
      return {
        ...state,
        loading: true,
      };
    case ADD_WATCHLIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action,
      };
    case ADD_WATCHLIST_ERROR:
      return {
        loading: false,
        success: false,
      };
    case DELETE_WATCHLIST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_WATCHLIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action,
      };
    case DELETE_WATCHLIST_ERROR:
      return {
        loading: false,
        success: false,
      };
    case GET_WATCHLIST:
      return {
        ...state,
        loading: true,
      };
    case GET_WATCHLIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.result,
      };
    case GET_WATCHLIST_ERROR:
      return defaultWatchListState;
    case UPDATE_WATCHLIST:
      return {
        ...state,
        moviesdata: {
          ...state.watchlist,
          [action.idMovie]: {
            title: '',
          },
        },
        loading: true,
      };
    case UPDATE_WATCHLIST_SUCCESS:
      return {
        loading: false,
        success: true,
        ...state,
        moviesdata: {
          // ...state.watchlist,
          [action.idMovie]: action.result,
        },
      };
    case UPDATE_WATCHLIST_ERROR:
      return {
        ...state,
        moviesdata: {
          // ...state.watchlist,
          [action.idMovie]: null,
        },
        loading: true,
      };
    default:
      return state;
  }
}
