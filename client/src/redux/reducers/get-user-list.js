import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
} from 'Actions/action-types';

const defaultGetUserListState = {
  loading: false,
  success: false,
  userList: null,
};

export default function getUserList(state = defaultGetUserListState, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        userList: action.userList,
      };
    case GET_USER_LIST_ERROR:
      return {
        loading: false,
        success: false,
        userList: null,
      };
    default:
      return state;
  }
}
