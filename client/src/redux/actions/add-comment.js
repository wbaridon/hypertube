import addCommentAPI from 'API/add-comment';
import {
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const addCommentStart = () => ({
  type: ADD_COMMENT,
});

export const addCommentSuccess = result => ({
  type: ADD_COMMENT_SUCCESS,
  result,
});

export const addCommentError = () => ({
  type: ADD_COMMENT_ERROR,
});

export const newCommentA = (userName, comment, timeStamp) => {
  return (dispatch) => {
    dispatch(addCommentStart());
    return addCommentAPI(userName, comment, timeStamp)
      .then(
        (result) => {
          dispatch(addCommentSuccess(result));
        },
        (error) => {
          dispatch(setErrorA(error.message));
          dispatch(addCommentError());
        },
      );
  };
};
