import weos from '../reducer';
import {
  setEventCount,
  setApplicationId,
  setToken,
  setUser,
  setSync,
  emptyQueue,
} from '../commands';
import events from './events';

describe('WeOS reducer', function () {
  const expectedInitialState = {
    eventCount: 0,
    applicationId: null,
    token: null,
    connected: false,
    online: true,
    syncing: false,
    user: null,
    eventsQueue: [],
  };

  it('should return initial state', () => {
    expect(weos(undefined, {})).toEqual(expectedInitialState);
  });

  it('should get updated count of events', () => {
    let state = weos(expectedInitialState, setEventCount(12));
    expect(state).toBeDefined();
    expect(state.eventCount).toEqual(12);
  });

  it('should get updated token', () => {
    let state = weos(expectedInitialState, setToken('token'));

    expect(state.token).not.toBeNull();
    expect(state.token).toEqual('token');
  });

  it('should get updated applicationId', () => {
    let state = weos(
      expectedInitialState,
      setApplicationId('36212c03-040b-4139-867f-bd76485f4084'),
    );

    expect(state.applicationId).not.toBeNull();
    expect(state.applicationId).toEqual('36212c03-040b-4139-867f-bd76485f4084');
  });

  it('should set user info', () => {
    let state = weos(
      expectedInitialState,
      setUser({
        sub: {
          email: 'example.com',
          userId: '332saf3',
          accountId: 'acf3233',
        },
      }),
    );

    expect(state.user).not.toBeNull();
    expect(state.user).toEqual({
      sub: {
        email: 'example.com',
        userId: '332saf3',
        accountId: 'acf3233',
      },
    });
  });

  it('should set sync state', () => {
    let state = weos(expectedInitialState, setSync(true));
    expect(state.syncing).toBe(true);
  });

  it('should empty the events queue', () => {
    let initialState = {...expectedInitialState, eventsQueue: events.events};
    let state = weos(initialState, emptyQueue());
    expect(state.eventsQueue.length).toBe(0);
  });
});
