import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_SUCCESS,
  CLEAR_SUCCESS,
} from './action-types';

export const setError = error => ({
  type: SET_ERROR,
  error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const setSuccess = success => ({
  type: SET_SUCCESS,
  success,
});

export const clearSuccess = () => ({
  type: CLEAR_SUCCESS,
});
