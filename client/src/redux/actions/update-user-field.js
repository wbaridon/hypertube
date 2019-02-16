import updateUserFieldAPI from 'API/update-user-field';
import {
  UPDATE_USER_FIELD,
  UPDATE_USER_FIELD_SUCCESS,
  UPDATE_USER_FIELD_ERROR,
} from './action-types';
import {
  setErrorA,
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

export const updateUserFieldStart = () => ({
  type: UPDATE_USER_FIELD,
});

export const updateUserFieldSuccess = result => ({
  type: UPDATE_USER_FIELD_SUCCESS,
  result,
});

export const updateUserFieldError = () => ({
  type: UPDATE_USER_FIELD_ERROR,
});

export const updateUserFieldA = (token, field, value) => {
  return (dispatch) => {
    dispatch(updateUserFieldStart());
    return updateUserFieldAPI(token, field, value)
      .then(
        (result) => {
          console.log(result);
          dispatch(updateUserFieldSuccess(result));
          dispatch(changeUserValueA(field, value));
          if (field === 'userName') {
            console.log('test');
            dispatch(updateUserTokenA(result.data));
            console.log(document.cookie);
            createCookie('userToken', result.data, 7);
            console.log(document.cookie);
          }
          if (result.data.profilIsFill) {
            dispatch(changeUserValueA('profilIsFill', result.data.profilIsFill));
            dispatch(setSuccessA('register.profileIsFilled'));
          }
        },
        (error) => {
          dispatch(setErrorA(error.response ? error.response.data.error : 'cantConnectToDb'));
          dispatch(updateUserFieldError());
        },
      );
  };
};
