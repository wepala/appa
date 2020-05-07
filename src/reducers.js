import {
  SET_EVENT_LAST_COUNT,
  SET_TOKEN,
  SET_APPLICATION_ID,
} from './actionTypes';

export const eventCount = (state = 0, action) => {
  switch (action.type) {
    case SET_EVENT_LAST_COUNT:
      return action.payload;
    default:
      return state;
  }
};

export const token = (state = null, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export const applicationId = (state = null, action) => {
  switch (action.type) {
    case SET_APPLICATION_ID:
      return action.payload;
    default:
      return state;
  }
};
