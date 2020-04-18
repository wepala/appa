import {ADD_TASK, REMOVE_TASK, UPDATE_TASK} from '../actionTypes';
import {v4 as uuidv4} from 'uuid';

const tasks = (state = {getByIds: {}}, action) => {
  switch (action.type) {
    case ADD_TASK:
      state.getByIds[uuidv4()] = action.payload;
      return state;
    case REMOVE_TASK:
      delete state.getByIds[action.payload];
      return state;
    case UPDATE_TASK:
      state.getByIds[action.id] = action.payload;
      return state;
    default:
      return state;
  }
};

export default tasks;
