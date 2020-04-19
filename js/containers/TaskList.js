import {connect} from 'react-redux';
import {addTask, removeTask} from '../state/tasks/actions';
import TaskList from '../views/components/tasks/TaskList';

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
)(TaskList);
