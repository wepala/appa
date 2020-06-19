import weos from '../reducer';
import {setEventCount, setApplicationId, setToken} from '../commands';

describe('WeOS reducer', function () {
  const expectedInitialState = {
    eventCount: 0,
    applicationId: null,
    token: null,
    connected: false,
    online: true,
    syncing: false,
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
});
