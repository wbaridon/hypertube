import registerUserAPI from 'API/register-user';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './action-types';

export const registerUserStart = () => ({
  type: REGISTER,
});

export const registerUserSuccess = result => ({
  type: REGISTER_SUCCESS,
  result,
});

export const registerUserError = error => ({
  type: REGISTER_ERROR,
  error,
});

export const registerUser = (form) => {
  return (dispatch) => {
    dispatch(registerUserStart());
    return registerUserAPI(form)
      .then(
        result => dispatch(registerUserSuccess(result)),
        error => dispatch(registerUserError(error)),
      );
  };
};
