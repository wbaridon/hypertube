import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_SUCCESS,
  CLEAR_SUCCESS,
} from './action-types';

export const setErrorA = error => ({
  type: SET_ERROR,
  error,
});

export const clearErrorA = () => ({
  type: CLEAR_ERROR,
});

export const setSuccessA = success => ({
  type: SET_SUCCESS,
  success,
});

export const clearSuccessA = () => ({
  type: CLEAR_SUCCESS,
});
