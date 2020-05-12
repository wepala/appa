import {ADD_LOG} from './commandTypes';

export const addTimeLog = (taskId, startTime) => {
  return {
    type: ADD_LOG,
    payload: {
      taskId: taskId,
      startTime: startTime,
    },
  };
};
