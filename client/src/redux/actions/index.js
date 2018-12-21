import {
  SET_LOCALE,
  TOGGLE_DARK_THEME,
  CHECK_USER_IN_COOKIE,
  DELETE_USER_FROM_COOKIE,
  CLEAR_REGISTER_DATA,
  SET_ERROR,
  CLEAR_ERROR,
} from './action-types';
import { loginUser } from './login-user';
import { logoutUser } from './logout-user';
import { registerUser } from './register-user';
import { registerUserOauth } from './register-user-oauth';
import { getUserInfoPrivate } from './get-user-info-private';
import { setUser, clearUser } from './current-user';
import {
  setError,
  clearError,
  setSuccess,
  clearSuccess,
} from './notifications';


export const checkUserInCookie = cookie => ({
  type: CHECK_USER_IN_COOKIE,
  cookie,
});

export const deleteUserFromCookie = () => ({
  type: DELETE_USER_FROM_COOKIE,
});

export const toggleDarkTheme = () => ({
  type: TOGGLE_DARK_THEME,
});

export const setLocale = locale => ({
  type: SET_LOCALE,
  locale,
});

export const clearRegisterData = () => ({
  type: CLEAR_REGISTER_DATA,
});

export {
  loginUser,
  logoutUser,
  registerUser,
  registerUserOauth,
  getUserInfoPrivate,
  setUser,
  clearUser,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
};
