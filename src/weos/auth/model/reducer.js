import {SET_TOKEN} from './commandTypes';

export const token = (state = null, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload.token;
    default:
      return state;
  }
};
