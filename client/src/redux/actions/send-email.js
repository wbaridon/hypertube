import sendEmailForgotPasswordAPI from 'API/send-email';
import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
} from './action-types';
import { setError } from '.';

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

export const sendEmail = (form) => {
  return (dispatch) => {
    dispatch(sendEmailStart());
    return sendEmailForgotPasswordAPI(form)
      .then(
        result => dispatch(sendEmailSuccess(result)),
        (error) => {
          dispatch(setError(error.message));
          dispatch(sendEmailError());
        },
      );
  };
};
