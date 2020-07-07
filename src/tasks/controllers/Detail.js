import {addTask, removeTask, updateTask} from '../model/commands';
import {Controller} from '../../controller';
import moment from 'moment';

export default class DetailController extends Controller {
  constructor() {
    super();
  }

  getTask(id) {
    return id !== undefined && id !== ''
      ? this.state.tasks.getById[id]
      : {
          title: '',
          description: '',
          dueDate: moment().toDate(),
          completed: true,
          agendas: [],
        };
  }

  onSave(
    title,
    description,
    dueDate,
    addToAgenda = false,
    estimatedTime = 15,
    estimatedUnit = 'minutes',
  ) {
    return new Promise((resolve) => {
      const task = {
        title: title,
        description: description,
        dueDate: dueDate,
        agendas: addToAgenda ? [moment().format('YYYY-MM-DD')] : [],
        estimatedTime:
          estimatedUnit == 'minutes'
            ? estimatedTime * 60
            : estimatedTime * 60 * 60,
        created: moment(),
      };
      this.dispatch(addTask(task));
      resolve();
    });
  }

  onUpdate(
    navigation,
    task,
    title,
    description,
    dueDate,
    estimatedTime,
    currentAgenda,
  ) {
    const updatedTask = {
      title,
      description,
      dueDate,
      estimatedTime,
      currentAgenda,
    };
    //TODO execute command to update task
    this.dispatch(updateTask(task.id, updatedTask));
    navigation.goBack();
    console.log('update task');
  }

  onRemove(taskId) {
    return new Promise((resolve) => {
      this.dispatch(removeTask(taskId));
      resolve();
    });
  }
}
