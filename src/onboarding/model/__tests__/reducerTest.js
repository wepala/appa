import onboard from '../reducer';
import {onBoardUser} from '../commands';

describe('onboarding reducer', function () {
  const expectedInitialState = {onBoarded: false};

  it('should return initial model', () => {
    expect(onboard(undefined, {})).toEqual(expectedInitialState);
  });

  it('should onboard user', () => {
    let state = onboard(expectedInitialState, onBoardUser(true));
    expect(state.onBoarded).toBe(true);
  });
});
