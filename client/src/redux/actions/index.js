import registerUserAPI from 'API/register-user';
import loginUserAPI from 'API/login-user';
import {
  SET_LOCALE,
  REGISTER_USER,
  LOGIN_USER,
  TOGGLE_DARK_THEME,
} from './action-types';


export const toggleDarkTheme = () => ({
  type: TOGGLE_DARK_THEME,
});

export const setLocale = locale => ({
  type: SET_LOCALE,
  locale,
});

export const registerUser = user => ({
  type: REGISTER_USER,
  async: true,
  httpMethodToInvoke: registerUserAPI,
  params: [user],
});

export const loginUser = user => ({
  type: LOGIN_USER,
  async: true,
  httpMethodToInvoke: loginUserAPI,
  params: [user],
});
