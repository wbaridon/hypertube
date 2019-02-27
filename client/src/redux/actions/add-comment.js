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

export const newCommentA = (token, comment, idMovie) => {
  return (dispatch) => {
    dispatch(addCommentStart());
    return addCommentAPI(token, comment, idMovie)
      .then(
        (response) => {
          dispatch(addCommentSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(addCommentError());
        },
      );
  };
};
