import {ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT} from './commandTypes';
import {v4 as uuidv4} from 'uuid';

const projects = (state = {getByIds: {}}, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      state.getByIds[uuidv4()] = action.payload;
      return state;
    case REMOVE_PROJECT:
      delete state.getByIds[action.payload];
      return state;
    case UPDATE_PROJECT:
      state.getByIds[action.meta.id] = action.payload;
      return state;
    default:
      return state;
  }
};

export default projects;
