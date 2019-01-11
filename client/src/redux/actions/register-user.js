import registerUserAPI from 'API/register-user';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './action-types';
import { setErrorA, addUserToUserListA, setSuccessA } from '.';

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

export const registerUserA = (form) => {
  return (dispatch) => {
    dispatch(registerUserStart());
    return registerUserAPI(form)
      .then(
        (result) => {
          dispatch(addUserToUserListA(result.data));
          dispatch(setSuccessA('register.success'));
          dispatch(registerUserSuccess(result));
        },
        (error) => {
          dispatch(setErrorA(error.message));
          dispatch(registerUserError());
        },
      );
  };
};
