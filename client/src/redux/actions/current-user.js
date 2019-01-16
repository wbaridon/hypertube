import {
  SET_USER,
  CLEAR_USER,
  CHANGE_USER_VALUE,
} from './action-types';

export const setUserA = (data, token) => ({
  type: SET_USER,
  data,
  token,
});

export const changeUserValueA = (field, value) => ({
  type: CHANGE_USER_VALUE,
  field,
  value,
});

export const clearUserA = () => ({
  type: CLEAR_USER,
});
