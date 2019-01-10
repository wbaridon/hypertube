import sendEmailForgotPasswordAPI from 'API/send-email';
import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
} from './action-types';
import { setErrorA } from '.';

export const sendEmailStart = () => ({
  type: SEND_EMAIL,
});

export const sendEmailSuccess = result => ({
  type: SEND_EMAIL_SUCCESS,
  result,
});

export const sendEmailError = () => ({
  type: SEND_EMAIL_ERROR,
});

export const sendEmailA = (form) => {
  return (dispatch) => {
    dispatch(sendEmailStart());
    return sendEmailForgotPasswordAPI(form)
      .then(
        result => dispatch(sendEmailSuccess(result)),
        (error) => {
          dispatch(setErrorA(error.message));
          dispatch(sendEmailError());
        },
      );
  };
};
