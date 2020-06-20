import {v4 as uuidv4} from 'uuid';
import {ADD_LOG, REMOVE_LOG, UPDATE_LOG} from './commandTypes';

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
    case UPDATE_LOG:
      getById = new Map([...state.getById.entries()]);
      getByTaskId = new Map([...state.getByTaskId.entries()]);
      getByTime = new Map([...state.getByTime.entries()]);
      let log = getById.get(action.meta.id);

      // Update by time
      if (getByTime.has(log.startTime)) {
        getByTime.delete(log.startTime);
        getByTime.set(action.payload.startTime, action.meta.id);
      }

      // update by taskid
      if (getByTaskId.has(log.taskId)) {
        const taskLogs = getByTaskId.get(log.taskId);
        const logIndex = taskLogs.indexOf(action.meta.id);
        taskLogs.splice(logIndex, 1);
        getByTaskId.set(log.taskId, taskLogs);
      }

      getById.set(action.meta.id, Object.assign({}, log, action.payload));

      if (getByTaskId.has(action.payload.taskId)) {
        getByTaskId.get(action.payload.taskId).push(action.meta.id);
      } else {
        getByTaskId.set(action.payload.taskId, [action.meta.id]);
      }

      return Object.assign({}, state, {
        getById: getById,
        getByTaskId: getByTaskId,
        getByTime: getByTime,
      });
    case REMOVE_LOG:
      getById = new Map([...state.getById.entries()]);
      getByTaskId = new Map([...state.getByTaskId.entries()]);
      getByTime = new Map([...state.getByTime.entries()]);
      let timelog = getById.get(action.payload.id);

      if (getByTime.has(timelog.startTime)) {
        getByTime.delete(timelog.startTime);
      }

      if (getByTaskId.has(timelog.taskId)) {
        const taskLogs = getByTaskId.get(timelog.taskId);
        const logIndex = taskLogs.indexOf(action.payload.id);
        taskLogs.splice(logIndex, 1);
      }

      getById.delete(action.payload.id);

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
