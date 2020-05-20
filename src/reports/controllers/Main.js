import {connect} from 'react-redux';
import OnboardNavigation from '../views/components/Navigation';

const mapStateToProps = state => {
  return {
    test: true,
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
