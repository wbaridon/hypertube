import {
  SET_USER,
  CLEAR_USER,
} from './action-types';

export const setUser = data => ({
  type: SET_USER,
  data,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});
