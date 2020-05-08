import {
  ADD_TASK,
  REMOVE_TASK,
  START_TASK,
  UPDATE_TASK,
  SYNC_TASK,
} from './commandTypes';

export const addTask = task => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const removeTask = taskId => {
  return {
    type: REMOVE_TASK,
    payload: taskId,
  };
};

export const updateTask = (taskId, task) => {
  return {
    type: UPDATE_TASK,
    payload: task,
    meta: {
      id: taskId,
    },
  };
};

export const startTask = taskId => {
  return {
    type: START_TASK,
    meta: {
      id: taskId,
    },
  };
};

export const syncTask = task => {
  return {
    type: SYNC_TASK,
    payload: task,
  };
};
