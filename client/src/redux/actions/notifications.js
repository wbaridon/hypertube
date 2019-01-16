import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_SUCCESS,
  CLEAR_SUCCESS,
} from './action-types';

export const setErrorA = (error, data) => ({
  type: SET_ERROR,
  error,
  data,
});

export const clearErrorA = () => ({
  type: CLEAR_ERROR,
});

export const setSuccessA = (success, data) => ({
  type: SET_SUCCESS,
  success,
  data,
});

export const clearSuccessA = () => ({
  type: CLEAR_SUCCESS,
});
