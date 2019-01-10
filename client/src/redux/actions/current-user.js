import {
  SET_USER,
  CLEAR_USER,
} from './action-types';

export const setUserA = data => ({
  type: SET_USER,
  data,
});

export const clearUserA = () => ({
  type: CLEAR_USER,
});
