import {OnboardingCompleteController} from '../Complete';
import {onBoardUser} from '../../model/commands';

describe('onboarding controller', function() {
  it('should update the state after all steps are completed', () => {
    const dispatch = jest.fn();
    const state = jest.fn();
    const controller = new OnboardingCompleteController(state, dispatch);
    controller.onComplete();
    expect(dispatch).toBeCalledWith(onBoardUser());
  });
});
