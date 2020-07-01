import {ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT} from './commandTypes';

export const addProject = (project) => {
  return {
    type: ADD_PROJECT,
    payload: project,
  };
};

export const removeProject = (projectId) => {
  return {
    type: REMOVE_PROJECT,
    payload: projectId,
  };
};

export const updateProject = (projectId, project) => {
  return {
    type: UPDATE_PROJECT,
    payload: project,
    meta: {
      id: projectId,
    },
  };
};
