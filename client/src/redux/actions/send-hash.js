import sendHashAPI from 'API/send-hash';
import {
  SEND_HASH,
  SEND_HASH_SUCCESS,
  SEND_HASH_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const sendHashStart = () => ({
  type: SEND_HASH,
});

export const sendHashSuccess = result => ({
  type: SEND_HASH_SUCCESS,
  result,
});

export const sendHashError = () => ({
  type: SEND_HASH_ERROR,
});

export const sendHashA = (hash) => {
  return (dispatch) => {
    dispatch(sendHashStart());
    return sendHashAPI(hash)
      .then(
        (response) => {
          dispatch(sendHashSuccess(response));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(sendHashError());
        },
      );
  };
};
