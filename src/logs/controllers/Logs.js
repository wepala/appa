import moment from 'moment';
import {Controller} from '../../controller';
import {getLogsByFilter} from '../model/selectors';
import {getTasksByDate} from '../../tasks/model/selectors';
import {memorizeLogsFilter} from '../model/memorize';

export default class LogsController extends Controller {
  configureState(state, props): {} {
    console.log('Logs Controller props:\n', props);
    const filter = memorizeLogsFilter(state);

    return {
      items: getLogsByFilter(state, props),
      tasks: [
        {id: undefined, title: 'All Tasks'},
        ...getTasksByDate(state, moment().format('YYYY-MM-DD')),
      ],
      setFilters: (startTime, endTime, taskId) =>
        filter(startTime, endTime, taskId),
    };
  }
}
