import moment from 'moment';
import {Controller} from '../../controller';
import {
  addTimeLog,
  updateTimeLog,
  removeTimeLog,
} from '../../logs/model/commands';
import {getTasksByDate} from '../../tasks/model/selectors';

export default class DetailController extends Controller {
  getLog(id) {
    let task = {
      title: '',
      description: '',
      dueDate: moment().toDate(),
      completed: true,
      agendas: [],
    };

    if (id) {
      const log = this.state.logs.getById.get(id);

      if (log.taskId) {
        task = this.state.tasks.getById[log.taskId];
      }

      return {...log, task: task};
    }

    return {
      id: '',
      startTime: moment().toDate(),
      task: task,
    };
  }

  onSave(taskId, startTime) {
    return new Promise((resolve) => {
      this.dispatch(addTimeLog(taskId, startTime));
      resolve();
    });
  }

  onUpdate(logId, taskId, startTime) {
    return new Promise((resolve) => {
      this.dispatch(updateTimeLog(logId, taskId, startTime));
      resolve();
    });
  }

  getTasks() {
    return getTasksByDate(this.state, moment().format('YYYY-MM-DD'));
  }

  onRemove(logId) {
    return new Promise((resolve) => {
      this.dispatch(removeTimeLog(logId));
      resolve();
    });
  }
}
