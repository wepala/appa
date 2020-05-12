import {connect} from 'react-redux';
import List from '../views/screens/List';

const mapStateToProps = state => {
  return {
    currentTask: state.currentTask,
    data: Object.values(state.tasks.getById),
    total: Object.values(state.tasks).length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartTask: () => {},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
