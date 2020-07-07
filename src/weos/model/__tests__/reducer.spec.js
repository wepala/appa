import weos from '../reducer';
import {setToken, setUser} from '../commands';

describe('Weos reducer', function () {
  const expectedInitialState = {token: null, user: null};

  it('should return initial state', () => {
    expect(weos(undefined, {})).toEqual(expectedInitialState);
  });

  it('should set token', () => {
    let state = weos(expectedInitialState, setToken('token'));

    expect(state).not.toBeNull();
    expect(state).toEqual({token: 'token', user: null});
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

    expect(state).not.toBeNull();
    expect(state).toEqual({
      token: null,
      user: {
        sub: {
          email: 'example.com',
          userId: '332saf3',
          accountId: 'acf3233',
        },
      },
    });
  });
});
