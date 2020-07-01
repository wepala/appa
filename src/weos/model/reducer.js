import {
  SET_TOKEN,
  SET_APPLICATION_ID,
  SET_EVENT_COUNT,
  SET_USER,
  SET_SYNC,
  EMPTY_QUEUE,
} from './commandTypes';

const weos = (
  state = {
    token: null,
    applicationId: null,
    eventCount: 0,
    connected: false,
    online: true,
    syncing: false,
    user: null,
    eventsQueue: [],
  },
  action,
) => {
  switch (action.type) {
    case SET_EVENT_COUNT:
      return {...state, eventCount: action.payload.eventCount};
    case SET_APPLICATION_ID:
      return {...state, applicationId: action.payload.applicationId};
    case SET_TOKEN:
      return {...state, token: action.payload.token};
    case SET_USER:
      return {...state, user: action.payload.user};
    case SET_SYNC:
      return {...state, syncing: action.payload.syncing};
    case EMPTY_QUEUE:
      return {...state, eventsQueue: []};
    default:
      return state;
  }
};

export default weos;
