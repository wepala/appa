import {connect} from 'react-redux';
import {Controller} from '../../controller';
import {getLogsByFilter} from '../model/selectors';

export default class LogsController extends Controller {
  configureState(state, props): {} {
    console.log('Logs Controller props:\n', props);

    return {
      items: getLogsByFilter(state, props),
    };
  }
}
