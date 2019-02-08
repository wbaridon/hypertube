import seenAPI from 'API/seen';
import {
  SEEN,
  SEEN_SUCCESS,
  SEEN_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const seenStart = () => ({
  type: SEEN,
});

export const seenSuccess = result => ({
  type: SEEN_SUCCESS,
  result,
});

export const seenError = () => ({
  type: SEEN_ERROR,
});

export const seenA = (token, idMovie) => {
  return (dispatch) => {
    dispatch(seenStart());
    return seenAPI(token, idMovie)
      .then(
        (response) => {
          dispatch(seenSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response.data));
          dispatch(seenError());
        },
      );
  };
};
