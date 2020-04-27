import {connect} from 'react-redux';
import {addTask} from '../model/commands';
import Create from '../views/screens/Create';

const mapStateToProps = state => {
  return {
    projects: Object.values(state.projects.getById),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreate: () => {
      //TODO execute command to create task
      console.log('create task');
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create);
