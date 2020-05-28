import {Controller} from '../../controller';
import {getLogsByFilter} from '../model/selectors';

export default class LogsController extends Controller {
  configureState(state, props): {} {
    return {
      items: getLogsByFilter(state, props),
    };
  }
}
