import registerUserAPI from 'API/register-user';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './action-types';
import {
  setErrorA,
  addUserToUserListA,
  setSuccessA,
  loginUserA,
} from '.';

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
          dispatch(loginUserA({
            userName: form.get('userName'),
            password: form.get('password'),
          }));
          dispatch(setSuccessA('register.success'));
          dispatch(registerUserSuccess(result));
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'api.error.cantConnectToDb'));
          dispatch(registerUserError());
        },
      );
  };
};
