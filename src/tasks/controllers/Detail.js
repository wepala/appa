import {addTask, updateTask} from '../model/commands';
import {Controller} from '../../controller';
import moment from 'moment';

export default class DetailController extends Controller {
  #id;
  #addToAgenda;

  constructor(id = null, addToAgenda = false) {
    super();
    this.#id = id;
    this.#addToAgenda = addToAgenda;
  }

  get projects() {
    return Object.values(this.state.projects.getById);
  }

  get task() {
    return this.#id != null
      ? this.state.tasks.getById[this.#id]
      : {
          title: '',
          description: '',
          dueDate: moment().toDate(),
          completed: true,
          agendas: [],
        };
  }

  onSave(title, description, dueDate, project) {
    return new Promise((resolve, reject) => {
      //TODO execute command to create task
      this.dispatch(
        addTask(
          title,
          description,
          dueDate,
          project,
          this.#addToAgenda ? [moment().format('YYYY-MM-DD')] : [],
        ),
      );
      resolve();
      return;
    });
  }

  onUpdate(navigation, task, title, description, dueDate, currentAgenda) {
    const updatedTask = {
      title: title,
      description: description,
      dueDate: dueDate,
      currentAgenda: currentAgenda,
    };
    //TODO execute command to update task
    this.dispatch(updateTask(task.id, updatedTask));
    navigation.goBack();
    console.log('update task');
  }
}
