import {
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

const defaultWatchlistState = {
  loading: false,
  success: false,
};

export default function watchlist(state = defaultWatchlistState, action) {
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
        data: action,
      };
    case GET_WATCHLIST_ERROR:
      return defaultWatchlistState;
    default:
      return state;
      
  }
}
