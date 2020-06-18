import {token, user} from '../reducer';
import {setToken, setUser} from '../commands';

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

describe('User reducer', function () {
  const expectedInitialState = null;

  it('should return initial state', () => {
    expect(user(undefined, {})).toEqual(expectedInitialState);
  });

  it('should set user info', () => {
    let state = user(
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
      sub: {
        email: 'example.com',
        userId: '332saf3',
        accountId: 'acf3233',
      },
    });
  });
});
