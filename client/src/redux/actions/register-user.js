import registerUserAPI from 'API/register-user';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './action-types';
import { setError } from '.';

export const registerUserStart = () => ({
  type: REGISTER,
});

export const registerUserSuccess = result => ({
  type: REGISTER_SUCCESS,
  result,
});

export const registerUserError = () => ({
  type: REGISTER_ERROR,
});

export const registerUser = (form) => {
  return (dispatch) => {
    dispatch(registerUserStart());
    return registerUserAPI(form)
      .then(
        result => dispatch(registerUserSuccess(result)),
        (error) => {
          dispatch(setError(error.message));
          dispatch(registerUserError());
        },
      );
  };
};
