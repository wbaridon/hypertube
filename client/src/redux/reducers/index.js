import { combineReducers } from 'redux';
import {
  SET_LOCALE,
  TOGGLE_DARK_THEME,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  PROTECTED_ROUTE_LOADING,
  PROTECTED_ROUTE_FINISHED,
} from '../actions/action-types';
import loginUser from './login-user';
import user from './current-user';
import registerUser from './register-user';
import notifications from './notifications';
import updateUser from './update-user';
import getUserList from './get-user-list';
import forgotPassword from './forgot-password';
import changeUserPassword from './change-user-password';
import movies from './movies';
import movie from './movie';
import comment from './comment';
import watchList from './watch-list';

const darkTheme = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_DARK_THEME:
      return !state;
    default:
      return state;
  }
};

const locale = (state = 'en', action) => {
  switch (action.type) {
    case SET_LOCALE:
      return action.locale;
    default:
      return state;
  }
};

const protectedRouteLoading = (state = true, action) => {
  switch (action.type) {
    case PROTECTED_ROUTE_LOADING:
      return true;
    case PROTECTED_ROUTE_FINISHED:
      return false;
    default:
      return state;
  }
};

const defaultSidebarState = {
  open: false,
};

const sidebar = (state = defaultSidebarState, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        open: true,
      };
    case CLOSE_SIDEBAR:
      return {
        open: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  locale,
  user,
  loginUser,
  registerUser,
  darkTheme,
  notifications,
  updateUser,
  sidebar,
  protectedRouteLoading,
  getUserList,
  forgotPassword,
  changeUserPassword,
  movies,
  movie,
  comment,
  watchList,
});
