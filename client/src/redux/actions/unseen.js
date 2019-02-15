import unseenAPI from 'API/unseen';
import {
  UNSEEN,
  UNSEEN_SUCCESS,
  UNSEEN_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const unseenStart = () => ({
  type: UNSEEN,
});

export const unseenSuccess = result => ({
  type: UNSEEN_SUCCESS,
  result,
});

export const unseenError = () => ({
  type: UNSEEN_ERROR,
});

export const unseenA = (token, idMovie) => {
  return (dispatch) => {
    dispatch(unseenStart());
    return unseenAPI(token, idMovie)
      .then(
        (response) => {
          dispatch(unseenSuccess(response.data));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'cantConnectToDb'));
          dispatch(unseenError());
        },
      );
  };
};
