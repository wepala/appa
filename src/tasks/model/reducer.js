import {ADD_TASK, REMOVE_TASK, UPDATE_TASK} from './commandTypes';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const tasks = (state = {currentTask: null, getById: {}}, action) => {
  switch (action.type) {
    case ADD_TASK:
      let newState = {...state};
      newState.getById[uuidv4()] = action.payload;
      return newState;
    case REMOVE_TASK:
      delete state.getById[action.payload];
      return state;
    case UPDATE_TASK:
      state.getById[action.meta.id] = action.payload;
      return state;
    default:
      return state;
  }
};

export default tasks;
