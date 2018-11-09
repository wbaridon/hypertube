import { SET_LOCALE, REGISTER_USER } from './action-types';
import registerUserAPI from '../api_tools/register-user';


export const setLocale = locale => ({
  type: SET_LOCALE,
  locale,
});

export const registerUser = user => ({
  type: REGISTER_USER,
  async: true,
  httpMethodToInvoke: registerUserAPI,
  params: [user],
});
