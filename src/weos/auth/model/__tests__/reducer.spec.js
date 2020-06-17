import {token} from '../reducer';
import {setToken} from '../commands';

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
