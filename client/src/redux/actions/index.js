import registerUserAPI from 'API/register-user';
import logoutUserAPI from 'API/logout-user';
import userInfoPrivateAPI from 'API/user-info-private';
import {
  SET_LOCALE,
  REGISTER_USER,
  LOGIN_USER,
  GET_USER_INFO_PRIVATE,
  TOGGLE_DARK_THEME,
  GET_MOVIES,
  CHECK_USER_IN_COOKIE,
  LOGOUT_USER,
} from './action-types';
import { loginUser } from './user';

export const getUserInfoPrivate = token => ({
  type: GET_USER_INFO_PRIVATE,
  async: true,
  httpMethodToInvoke: userInfoPrivateAPI,
  params: [token],
});

export const checkUserInCookie = cookie => ({
  type: CHECK_USER_IN_COOKIE,
  cookie,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
  async: true,
  httpMethodToInvoke: logoutUserAPI,
  params: [],
});

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

export { loginUser };
// export const loginUser = user => ({
//   type: LOGIN_USER,
//   async: true,
//   httpMethodToInvoke: loginUserAPI,
//   params: [user],
// });