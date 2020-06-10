import {Controller} from '../../controller';
import {getIncompleteTasks} from '../model/selectors';
import {updateTask} from '../model/commands';

export default class BacklogController extends Controller {
  addToAgenda(task, date) {
    return new Promise((resolve) => {
      this.dispatch(
        updateTask(task.id, {agendas: task.agendas.concat([date])}),
      );
      resolve();
    });
  }
  //in order to use reselector I had to override the configureState function of the controller
  configureState(state) {
    return {
      items: getIncompleteTasks(state),
    };
  }

  /**
   * Task complete handler
   * @param id
   * @param state boolean
   * @returns {Promise<R>}
   */
  setTaskCompletion(id, state = true) {
    return new Promise((resolve) => {
      this.dispatch(updateTask(id, {complete: state}));
      resolve();
    });
  }
}
