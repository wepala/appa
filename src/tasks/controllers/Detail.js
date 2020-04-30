import {connect} from 'react-redux';
import {addTask, updateTask} from '../model/commands';
import DetailScreen from '../views/screens/Detail';

const mapStateToProps = state => {
  return {
    projects: Object.values(state.projects.getById),
    tasks: state.tasks.getById,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreate: (navigation, title, description, dueDate, currentAgenda) => {
      const task = {
        title: title,
        description: description,
        dueDate: dueDate,
        currentAgenda: currentAgenda,
      };
      //TODO execute command to create task
      dispatch(addTask(task));
      navigation.goBack();
      console.log('create task');
    },
    onUpdate: (
      navigation,
      task,
      title,
      description,
      dueDate,
      currentAgenda,
    ) => {
      const updatedTask = {
        title: title,
        description: description,
        dueDate: dueDate,
        currentAgenda: currentAgenda,
      };
      //TODO execute command to update task
      dispatch(updateTask(task.id, updatedTask));
      navigation.goBack();
      console.log('update task');
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailScreen);
