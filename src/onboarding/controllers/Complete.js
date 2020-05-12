import {onBoardUser} from '../model/commands';
import {Controller} from '../../controller';

/**
 * @class OnboardingCompleteController Final section of the onboarding process
 */
export default class OnboardingCompleteController extends Controller {
  /**
   * Finish the onboarding process
   */
  onComplete() {
    this.dispatch(onBoardUser());
  }
}
