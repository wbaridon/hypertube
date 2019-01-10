import {
  SET_USER,
  CLEAR_USER,
} from './action-types';

export const setUserA = (data, token) => ({
  type: SET_USER,
  data,
  token,
});

export const clearUserA = () => ({
  type: CLEAR_USER,
});
