import {SET_TOKEN, SET_USER} from './commandTypes';

const weos = (
  state = {
    token: null,
    user: null,
  },
  action,
) => {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.payload.token};
    case SET_USER:
      return {...state, user: action.payload.user};
    default:
      return state;
  }
};

export default weos;
