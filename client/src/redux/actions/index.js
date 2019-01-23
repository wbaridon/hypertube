import {
  SET_LOCALE,
  TOGGLE_DARK_THEME,
  CLEAR_REGISTER_DATA,
  PROTECTED_ROUTE_LOADING,
  PROTECTED_ROUTE_FINISHED,
  DELETE_USER_FROM_USER_LIST,
  ADD_USER_TO_USER_LIST,
} from './action-types';
import { loginUserA } from './login-user';
import { logoutUserA } from './logout-user';
import { registerUserA } from './register-user';
import { oAuthUserA } from './oauth-user';
import { getUserInfoPrivateA } from './get-user-info-private';
import { setUserA, clearUserA, changeUserValueA } from './current-user';
import { sendEmailA } from './send-email';
import { resetPasswordA } from './reset-password';
import { updateUserFieldA } from './update-user-field';
import { updateUserImageA } from './update-user-image';
import { getUserListA } from './get-user-list';
import { getUserInfoA } from './get-user-info';
import { changeUserPasswordA } from './change-user-password';
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
import { getMoviePageA } from './get-movie-page';

export const deleteUserFromUserListA = user => ({
  type: DELETE_USER_FROM_USER_LIST,
  user,
});

export const addUserToUserListA = user => ({
  type: ADD_USER_TO_USER_LIST,
  user,
});

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
  oAuthUserA,
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
  getUserInfoA,
  changeUserValueA,
  changeUserPasswordA,
  getMoviePageA,
};
