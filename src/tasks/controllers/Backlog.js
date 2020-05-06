import {Controller} from '../../controller';
import {getIncompleteTasks} from '../model/selectors';

export default class BacklogController extends Controller {
  //in order to use reselector I had to override the configureState function of the controller
  configureState(state) {
    return {
      items: getIncompleteTasks(state.tasks),
    };
  }
}
