import {ADD_LOG, UPDATE_LOG, REMOVE_LOG} from './commandTypes';

export const addTimeLog = (taskId, startTime) => {
  return {
    type: ADD_LOG,
    payload: {
      taskId: taskId,
      startTime: startTime,
    },
  };
};

export const updateTimeLog = (logId, taskId, startTime) => {
  return {
    type: UPDATE_LOG,
    payload: {
      taskId: taskId,
      startTime: startTime,
    },
    meta: {
      id: logId,
    },
  };
};

export const removeTimeLog = logId => {
  return {
    type: REMOVE_LOG,
    payload: {
      id: logId,
    },
  };
};
