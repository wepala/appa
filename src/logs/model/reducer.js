import {v4 as uuidv4} from 'uuid';
import {ADD_LOG} from './commandTypes';

const logs = (
  state = {getByTaskId: [], getById: {}, getByTime: []},
  action,
) => {
  let getById = {};
  let getByTaskId = [];
  let getByTime = [];

  switch (action.type) {
    case ADD_LOG:
      //deep copy the getByTaskId
      Object.keys(state.getById).map(id => {
        getById = Object.assign({}, getById, {
          [id]: state.getById[id],
        });
      });
      //add the new time log
      const generatedId = uuidv4();
      getById = Object.assign({}, getById, {
        [generatedId]: Object.assign({}, action.payload, {
          id: generatedId,
          meta: {
            id: generatedId,
          },
        }),
      });
      //add to the task id index
      state.getByTaskId.forEach((value, index) => {
        getByTaskId[index] = value;
      });
      if (getByTaskId[action.payload.taskId] !== undefined) {
        getByTaskId[action.payload.taskId].push(generatedId);
      } else {
        getByTaskId[action.payload.taskId] = [generatedId];
      }

      //add to the timeindex
      state.getByTime.forEach((value, index) => {
        getByTime[index] = value;
      });
      getByTaskId[action.payload.startTime] = generatedId;

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
