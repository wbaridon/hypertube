import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  DELETE_USER_FROM_USER_LIST,
  ADD_USER_TO_USER_LIST,
} from 'Actions/action-types';

const defaultGetUserListState = {
  loading: false,
  success: false,
  fetched: false,
  userList: [],
  users: {},
};

export default function getUserList(state = defaultGetUserListState, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        loading: true,
        fetched: true,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        success: true,
        userList: action.userList,
      };
    case GET_USER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        userList: null,
      };
    case GET_USER_INFO:
      return {
        ...state,
        users: {
          ...state.users,
          [action.userName]: {
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.userName]: action.user,
        },
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        users: {
          ...state.users,
          [action.userName]: null,
        },
      };
    case DELETE_USER_FROM_USER_LIST:
      return {
        ...state,
        users: {
          ...state.users,
          [action.user]: null,
        },
      };
    case ADD_USER_TO_USER_LIST:
      return {
        ...state,
        userList: [...state.userList, action.user],
      };
    default:
      return state;
  }
}
