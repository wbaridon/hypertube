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

const defaultWatchListState = {
  loading: false,
  success: false,
};

export default function watchList(state = defaultWatchListState, action) {
  switch (action.type) {
    // case SEEN_SUCCESS:
    //   return {
    //     ...state,
    //     // data: [
    //     //   ...state.data,
    //     //   ...state.data.slice(0, action.n),
    //     //   Object.assign(action.result, ...state.data[action.n]),
    //     //   ...state.data.slice(action.n),
    //     // ],
    //     data: [...state.data, state.data[action.n].seen = true],
    //     test: [state.data[action.n].seen],
    //   };
    case ADD_WATCHLIST:
      return {
        ...state,
        loading: true,
      };
    case ADD_WATCHLIST_SUCCESS:
      return {
        loading: false,
        success: true,
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
        data: action.result,
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
        data: [],
      };
    case GET_WATCHLIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.result,
      };
    case GET_WATCHLIST_ERROR:
      return defaultWatchListState;
    default:
      return state;
  }
}
