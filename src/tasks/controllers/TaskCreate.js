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
    onCreate: (navigation, title, description, dueDate) => {
      const task = {
        title: title,
        description: description,
        dueDate: dueDate,
      };
      //TODO execute command to create task
      dispatch(addTask(task));
      navigation.goBack();
      console.log('create task');
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create);
