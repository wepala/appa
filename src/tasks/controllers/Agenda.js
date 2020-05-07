import {Controller} from '../../controller';
import {getTasksByDate} from '../model/selectors';
import moment from 'moment';
import {updateTask} from '../model/commands';

/**
 * Agenda List Controller. Provides handlers and data for the agenda list
 */
export default class AgendaController extends Controller {
  // get items() {
  //   return getTasksByDate(state.tasks, new Date());
  // }
  /**
   * Task complete handler
   * @param id
   * @param state boolean
   * @returns {Promise<R>}
   */
  setTaskCompletion(id, state = true) {
    return new Promise(resolve => {
      this.dispatch(updateTask(id, {complete: state}));
      resolve();
    });
  }

  //in order to use reselector I had to override the configureState function of the controller
  configureState(state) {
    return {
      items: getTasksByDate(state.tasks, moment().format('YYYY-MM-DD')),
    };
  }
}
