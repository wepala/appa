import {connect} from 'react-redux';
import {Controller} from '../../controller';
import {getLogsByFilter} from '../model/selectors';
import {tasksSelector} from '../../tasks/model/selectors';

export default class LogsController extends Controller {
  configureState(state, props): {} {
    let tasks = tasksSelector(state);
    let logs = getLogsByFilter(state, props);
    logs = logs.map(log => {
      let taskIndex = tasks.findIndex(task => {
        return task.id === log.taskId;
      });
      return {
        ...log,
        ...tasks[taskIndex],
      };
    });
    console.log(tasks);
    return {
      items: logs,
    };
  }
}
