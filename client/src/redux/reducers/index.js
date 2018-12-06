import { combineReducers } from 'redux';
import {
  SET_LOCALE,
  TOGGLE_DARK_THEME,
} from '../actions/action-types';
import user from './user';

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

export default combineReducers({
  locale,
  user,
  darkTheme,
});
