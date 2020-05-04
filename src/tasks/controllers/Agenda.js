import {Controller} from '../../controller';
import {getTasksByDate} from '../model/selectors';

export default class AgendaController extends Controller {
  get items() {
    return getTasksByDate(this.state.tasks, new Date());
  }
}
