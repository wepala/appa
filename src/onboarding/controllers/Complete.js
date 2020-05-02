import {connect} from 'react-redux';
import Complete from '../views/screens/Complete';
import {onBoardUser} from '../model/commands';

/**
 * @class OnboardingCompleteController Final section of the onboarding process
 */
export class OnboardingCompleteController {
  constructor(state, dispatch) {
    this.state = state;
    this.dispatch = dispatch;
  }

  /**
   * Finish the onboarding process
   */
  onComplete() {
    this.dispatch(onBoardUser());
  }
}

const mapStateToProps = state => {
  return {
    onBoarded: state.onboard.onBoarded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowConnect: () => {},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Complete);
