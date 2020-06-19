import {SET_TOKEN, SET_USER} from './commandTypes';

export const token = (state = null, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload.token;
    default:
      return state;
  }
};

export const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload.user;
    default:
      return state;
  }
};
