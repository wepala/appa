import {SET_TOKEN, SET_APPLICATION_ID, SET_EVENT_COUNT} from './commandTypes';

const weos = (
  state = {
    token: null,
    applicationId: null,
    eventCount: 0,
    connected: false,
    online: true,
    syncing: false,
  },
  action,
) => {
  switch (action.type) {
    case SET_EVENT_COUNT:
      return Object.assign({}, state, {eventCount: action.payload});
    case SET_TOKEN:
      return Object.assign({}, state, {token: action.payload});
    case SET_APPLICATION_ID:
      return Object.assign({}, state, {applicationId: action.payload});
    default:
      return state;
  }
};

export default weos;
