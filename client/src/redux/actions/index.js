import {
  SET_LOCALE,
  TOGGLE_DARK_THEME,
  CLEAR_REGISTER_DATA,
  PROTECTED_ROUTE_LOADING,
  PROTECTED_ROUTE_FINISHED,
} from './action-types';
import { loginUserA } from './login-user';
import { logoutUserA } from './logout-user';
import { registerUserA } from './register-user';
import { registerUserOauthA } from './register-user-oauth';
import { getUserInfoPrivateA } from './get-user-info-private';
import { setUserA, clearUserA } from './current-user';
import { sendEmailA } from './send-email';
import { resetPasswordA } from './reset-password';
import { updateUserFieldA } from './update-user-field';
import { updateUserImageA } from './update-user-image';
import { getUserListA } from './get-user-list';
import {
  checkUserInCookieA,
  deleteUserFromCookieThunkA,
} from './check-user-in-cookie';
import {
  setErrorA,
  clearErrorA,
  setSuccessA,
  clearSuccessA,
} from './notifications';
import {
  openSidebarA,
  closeSidebarA,
} from './sidebar';

export const toggleDarkThemeA = () => ({
  type: TOGGLE_DARK_THEME,
});

export const setLocaleA = locale => ({
  type: SET_LOCALE,
  locale,
});

export const clearRegisterDataA = () => ({
  type: CLEAR_REGISTER_DATA,
});

export const protectedRouteLoadingA = () => ({
  type: PROTECTED_ROUTE_LOADING,
});

export const protectedRouteFinishedA = () => ({
  type: PROTECTED_ROUTE_FINISHED,
});

export {
  loginUserA,
  logoutUserA,
  registerUserA,
  registerUserOauthA,
  getUserInfoPrivateA,
  setUserA,
  clearUserA,
  setErrorA,
  clearErrorA,
  setSuccessA,
  clearSuccessA,
  checkUserInCookieA,
  deleteUserFromCookieThunkA,
  sendEmailA,
  resetPasswordA,
  updateUserFieldA,
  updateUserImageA,
  openSidebarA,
  closeSidebarA,
  getUserListA,
};
