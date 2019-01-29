import deleteCommentAPI from 'API/delete-comment';
import {
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const deleteCommentStart = () => ({
  type: DELETE_COMMENT,
});

export const deleteCommentSuccess = result => ({
  type: DELETE_COMMENT_SUCCESS,
  result,
});

export const deleteCommentError = () => ({
  type: DELETE_COMMENT_ERROR,
});

export const deleteCommentA = (idComment) => {
  return (dispatch) => {
    dispatch(deleteCommentStart());
    return deleteCommentAPI(idComment)
      .then(
        (result) => {
          dispatch(deleteCommentSuccess(result));
        },
        (error) => {
          dispatch(setErrorA(error.message));
          dispatch(deleteCommentError());
        },
      );
  };
};
