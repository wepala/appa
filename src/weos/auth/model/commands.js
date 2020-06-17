import {SET_TOKEN} from './commandTypes';

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: {token},
  };
};
