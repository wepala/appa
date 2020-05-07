import {
  SET_EVENT_LAST_COUNT,
  SET_TOKEN,
  SET_APPLICATION_ID,
} from './actionTypes';

export const setEventCount = lastCount => {
  return {
    type: SET_EVENT_LAST_COUNT,
    payload: lastCount,
  };
};

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setApplicationId = applicationId => {
  return {
    type: SET_APPLICATION_ID,
    payload: applicationId,
  };
};
