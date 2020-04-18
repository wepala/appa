import {ADD_TASK, REMOVE_TASK, UPDATE_TASK} from '../actionTypes';

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
    id: taskId,
  };
};
