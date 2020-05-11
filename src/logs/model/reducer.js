import {v4 as uuidv4} from 'uuid';
import {ADD_LOG} from './commandTypes';

const logs = (
  state = {getByTaskId: new Map(), getById: new Map(), getByTime: new Map()},
  action,
) => {
  let getById = new Map();
  let getByTaskId = new Map();
  let getByTime = new Map();

  switch (action.type) {
    case ADD_LOG:
      //deep copy the getById
      for (let [key, value] of state.getById) {
        getById.set(key, value);
      }

      //deep copy the getByTaskId
      for (let [key, value] of state.getByTaskId) {
        getByTaskId.set(key, value);
      }

      //deep copy the getByTime
      for (let [key, value] of state.getByTime) {
        getByTime.set(key, value);
      }

      //add the new time log
      const generatedId = uuidv4();
      getById.set(
        generatedId,
        Object.assign({}, action.payload, {
          id: generatedId,
          meta: {
            id: generatedId,
          },
        }),
      );
      //add to the task id index
      if (getByTaskId.has(action.payload.taskId)) {
        getByTaskId.get(action.payload.taskId).push(generatedId);
      } else {
        getByTaskId.set(action.payload.taskId, [generatedId]);
      }

      //add to the time index
      getByTime.set(action.payload.startTime, generatedId);

      //return the updated state
      return Object.assign({}, state, {
        getById: getById,
        getByTaskId: getByTaskId,
        getByTime: getByTime,
      });
    default:
      return state;
  }
};

export default logs;
