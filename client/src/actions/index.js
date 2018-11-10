import {
  SET_LOCALE,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  TOGGLE_DARK_THEME,
} from './action-types';
import registerUserAPI from '../api_tools/register-user';
import loginUserAPI from '../api_tools/login-user';
import logoutUserAPI from '../api_tools/logout-user';

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

export const logoutUser = user => ({
  type: LOGOUT_USER,
  async: true,
  httpMethodToInvoke: logoutUserAPI,
  params: [user],
});
