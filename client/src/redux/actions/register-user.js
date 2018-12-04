import registerUserAPI from 'API/register-user';
import userInfoPrivateAPI from 'API/user-info-private';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  POPULATE_USER,
} from './action-types';

export const populateUser = response => ({
  type: POPULATE_USER,
  data: response.data,
});

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
