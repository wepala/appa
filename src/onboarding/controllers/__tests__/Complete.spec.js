import OnboardingCompleteController from '../Complete';
import {onBoardUser} from '../../model/commands';

describe('onboarding controller', function() {
  it('should update the state after all steps are completed', () => {
    const dispatch = jest.fn();
    const state = jest.fn();
    const controller = new OnboardingCompleteController();
    controller.dispatch = dispatch;
    controller.state = state;
    controller.onComplete();
    expect(dispatch).toBeCalledWith(onBoardUser());
  });
});
