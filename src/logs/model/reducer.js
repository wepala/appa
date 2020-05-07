import {v4 as uuidv4} from 'uuid';
import {ADD_LOG} from './commandTypes';

const logs = (state = {getByTaskId: {}}, action) => {
  let getByTaskId = {};
  switch (action.type) {
    case ADD_LOG:
      //deep copy the getByTaskId
      Object.keys(state.getByTaskId).map(id => {
        getByTaskId = Object.assign({}, getByTaskId, {
          [id]: state.getByTaskId[id],
        });
      });
      //add the new time log
      const generatedId = uuidv4();
      getByTaskId = Object.assign({}, getByTaskId, {
        [action.payload.taskId]: Object.assign({}, action.payload, {
          id: generatedId,
          meta: {
            id: generatedId,
          },
        }),
      });
      //return the updated state
      return Object.assign({}, state, {getByTaskId: getByTaskId});
    default:
      return state;
  }
};

export default logs;
