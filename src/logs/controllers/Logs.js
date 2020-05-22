import {connect} from 'react-redux';
import moment from 'moment';
import {Controller} from '../../controller';
import {getLogsByFilter} from '../model/selectors';
import {getTasksByDate} from '../../tasks/model/selectors';

export default class LogsController extends Controller {
  // constructor() {
  //   super();
  //   this.filteredTasks = [];
  //   this.items = [];
  // }
  configureState(state, props): {} {
    console.log('Logs Controller props:\n', props);

    return {
      items: getLogsByFilter(state, props), //this.filterByTask(state, props),
      tasks: getTasksByDate(state, moment().format('YYYY-MM-DD')),
      setFilters: (startTime, endTime, taskId) => {
        props.startTime = startTime;
        props.endTime = endTime;
        props.taskId = taskId;
        props.address = 'chad';
      },
      // onFilterByTask: this.filterByTask.bind(this, state, 'llkkk', 'klk'),
      // filteredTasks: this.filteredTasks,
    };
  }

  // filterByTask(state, props) {

  //   // console.log(this.state);
  //   // console.log(this.dispatch);
  //   // console.log('onFilter by =>>>>>>>>>>>>>>>>', state, taskId);
  //   console.log('taskByFilter====', arguments[arguments.length - 1]);
  //   this.filteredTasks = getLogsByFilter(state, {
  //     taskId: arguments[arguments.length - 1],
  //   });

  //   if (arguments.length < 3) {
  //     return getLogsByFilter(state, props);
  //   }

  //   console.log('thisis filtebytask =====> ', this.filteredTasks);
  //   return this.filteredTasks;
  // }
}
