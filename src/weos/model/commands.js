import {
  SET_TOKEN,
  SET_USER,
  SET_APPLICATION_ID,
  SET_EVENT_COUNT,
  SET_SYNC,
  EMPTY_QUEUE,
} from './commandTypes';

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: {token},
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {user},
  };
};

export const setEventCount = (eventCount) => {
  return {
    type: SET_EVENT_COUNT,
    payload: {eventCount},
  };
};

export const setApplicationId = (applicationId) => {
  return {
    type: SET_APPLICATION_ID,
    payload: {applicationId},
  };
};

export const setSync = (syncing) => {
  return {
    type: SET_SYNC,
    payload: {syncing},
  };
};

export const emptyQueue = () => {
  return {
    type: EMPTY_QUEUE,
  };
};
