import {connect} from 'react-redux';
import OnboardNavigation from '../views/components/Navigation';

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
)(OnboardNavigation);
