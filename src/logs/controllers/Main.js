import {connect} from 'react-redux';
import Navigation from '../views/components/Navigation';

const mapStateToProps = state => {
  return {
    isSetup: true,
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
)(Navigation);
