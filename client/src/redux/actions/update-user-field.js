import updateUserFieldAPI from 'API/update-user-field';
import {
  UPDATE_USER_FIELD,
  UPDATE_USER_FIELD_SUCCESS,
  UPDATE_USER_FIELD_ERROR,
  CLEAR_USER_FIELD_ERROR,
} from './action-types';
import {
  changeUserValueA,
  setSuccessA,
  updateUserTokenA,
} from '.';


function createCookie(name, value, days) {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  } else expires = '';
  document.cookie = `${name}=${value}${expires}; path=/`;
}

export const clearUserFieldErrorA = () => ({
  type: CLEAR_USER_FIELD_ERROR,
});

export const updateUserFieldStart = () => ({
  type: UPDATE_USER_FIELD,
});

export const updateUserFieldSuccess = result => ({
  type: UPDATE_USER_FIELD_SUCCESS,
  result,
});

export const updateUserFieldError = (errorMessage, field, value) => ({
  type: UPDATE_USER_FIELD_ERROR,
  errorMessage,
  field,
  value,
});

export const updateUserFieldA = (token, field, value) => {
  return (dispatch) => {
    dispatch(updateUserFieldStart());
    dispatch(changeUserValueA(field, value));
    return updateUserFieldAPI(token, field, value)
      .then(
        (result) => {
          dispatch(updateUserFieldSuccess(result));
          dispatch(changeUserValueA(field, value));
          if (field === 'userName') {
            dispatch(updateUserTokenA(result.data));
            createCookie('userToken', result.data, 7);
          }
          if (result.data.profilIsFill) {
            dispatch(changeUserValueA('profilIsFill', result.data.profilIsFill));
            dispatch(setSuccessA('register.profileIsFilled'));
          }
        },
        (error) => {
          dispatch(changeUserValueA(error.response.data.field, error.response.data.value));
          dispatch(updateUserFieldError(error.response ? error.response.data.error : 'api.error.cantConnectToDb', error.response.data.field, error.response.data.value));
        },
      );
  };
};
