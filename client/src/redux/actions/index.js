import {
  SET_LOCALE,
  TOGGLE_DARK_THEME,
  CLEAR_REGISTER_DATA,
} from './action-types';
import { loginUser } from './login-user';
import { logoutUser } from './logout-user';
import { registerUser } from './register-user';
import { registerUserOauth } from './register-user-oauth';
import { getUserInfoPrivate } from './get-user-info-private';
import { setUser, clearUser } from './current-user';
import { sendEmail } from './send-email';
import { resetPassword } from './reset-password';
import {
  checkUserInCookie,
  deleteUserFromCookieThunk,
} from './check-user-in-cookie';
import {
  setError,
  clearError,
  setSuccess,
  clearSuccess,
} from './notifications';

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
  checkUserInCookie,
  deleteUserFromCookieThunk,
  sendEmail,
  resetPassword,
};
