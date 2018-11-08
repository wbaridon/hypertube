import Axios from 'axios';
import {
  CHANGE_LOCALE_REQUEST,
  CHANGE_LOCALE_SUCCESS,
  CHANGE_LOCALE_ERROR,
} from './action-types';

export default function changeLocale(newLocale) {
  return (dispatch, getState) => {
    const { locale, user } = getState();
    const { userName } = user;
    if (newLocale === locale) {
      return;
    }
    dispatch({
      type: CHANGE_LOCALE_REQUEST,
      locale,
      userName,
    });

    Axios.post('http://localhost:3000/user/setLocale', {
      authToken: 'myToken', // fake token
      newLocale,
      userName,
    }).then((response) => {
      dispatch({
        type: CHANGE_LOCALE_SUCCESS,
        locale,
        response,
      });
      console.log(response);
    }).catch((error) => {
      dispatch({
        type: CHANGE_LOCALE_ERROR,
        locale,
        error,
      });
      console.log(error);
    });
  };
}
