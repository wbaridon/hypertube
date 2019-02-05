import {
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from 'Actions/action-types';

const defaultaddCommentState = {
  loading: false,
  success: false,
};

export default function comment(state = defaultaddCommentState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        loading: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.comment,
      };
    case ADD_COMMENT_ERROR:
      return {
        loading: false,
        success: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_COMMENT_ERROR:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
}
