import {eventCount, token, applicationId} from '../reducers';
import {setEventCount, setToken, setApplicationId} from '../actions';

describe('EventCount reducer', function () {
  const expectedInitialState = 0;

  it('should return initial state', () => {
    expect(eventCount(undefined, {})).toEqual(expectedInitialState);
  });

  it('should get updated count of events', () => {
    let state = eventCount(expectedInitialState, setEventCount(12));

    expect(state).toBeDefined();
    expect(state).toEqual(12);
  });
});

describe('Token reducer', function () {
  const expectedInitialState = null;

  it('should return initial state', () => {
    expect(token(undefined, {})).toEqual(expectedInitialState);
  });

  it('should get updated token', () => {
    let state = token(expectedInitialState, setToken('token'));

    expect(state).not.toBeNull();
    expect(state).toEqual('token');
  });
});

describe('ApplicationId reducer', function () {
  const expectedInitialState = null;

  it('should return initial state', () => {
    expect(applicationId(undefined, {})).toEqual(expectedInitialState);
  });

  it('should get updated applicationId', () => {
    let state = applicationId(
      expectedInitialState,
      setApplicationId('36212c03-040b-4139-867f-bd76485f4084'),
    );

    expect(state).not.toBeNull();
    expect(state).toEqual('36212c03-040b-4139-867f-bd76485f4084');
  });
});
