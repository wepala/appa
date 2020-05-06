import {eventLastCount, token, applicationId} from '../reducers';
import {setEventLastCount, setToken} from '../actions';

describe('EventLastCount reducer', function() {
  const expectedInitialState = 0;

  it('should return initial state', () => {
    expect(eventLastCount(undefined, {})).toEqual(expectedInitialState);
  });

  it('should set update eventLastCount with new value', () => {
    let state = eventLastCount(expectedInitialState, setEventLastCount(12));

    expect(state).toBeDefined();
    expect(state).toEqual(12);
  });
});

describe('token reducer', function() {
  const expectedInitialState = null;

  it('should return initial state', () => {
    expect(token(undefined, {})).toEqual(expectedInitialState);
  });

  it('should set update token with new value', () => {
    let state = token(expectedInitialState, setToken('token'));

    expect(state).not.toBeNull();
    expect(state).toEqual('token');
  });
});

describe('ApplicationId reducer', function() {
  const expectedInitialState = null;

  it('should return initial state', () => {
    expect(applicationId(undefined, {})).toEqual(expectedInitialState);
  });

  it('should set update applicationId with new value', () => {
    let state = token(
      expectedInitialState,
      setToken('36212c03-040b-4139-867f-bd76485f4084'),
    );

    expect(state).not.toBeNull();
    expect(state).toEqual('36212c03-040b-4139-867f-bd76485f4084');
  });
});
