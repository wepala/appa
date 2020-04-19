import {ADD_LOG, REMOVE_LOG, UPDATE_LOG} from '../actionTypes';
import {v4 as uuidv4} from 'uuid';

const logs = (state = {currentLog: {}, getByIds: {}}, action) => {
  switch (action.type) {
    case ADD_LOG:
      state.getByIds[uuidv4()] = action.payload;
      return state;
    case REMOVE_LOG:
      delete state.getByIds[action.payload];
      return state;
    case UPDATE_LOG:
      state.getByIds[action.id] = action.payload;
      return state;
    default:
      return state;
  }
};

export default logs;
