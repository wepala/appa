import {addTask} from '../../model/commands';
import DetailController from '../Detail';
import moment from 'moment';

describe('Task Create Controller', () => {
  it('should create a task in backlog', () => {
    const today = new Date();
    const dispatch = jest.fn();
    const expectedTask = {
      title: 'test task',
      description: 'test task description',
      agendas: [],
      dueDate: today.toISOString(),
    };

    const controller = new DetailController();
    const state = controller.configureDispatch(dispatch);
    state.onSave(
      expectedTask.title,
      expectedTask.description,
      expectedTask.dueDate,
      '',
    );
    expect(dispatch).toBeCalledWith(
      addTask(
        expectedTask.title,
        expectedTask.description,
        expectedTask.dueDate,
        '',
        expectedTask.agendas,
      ),
    );
  });
  it('should create a task on the current agenda when add to agenda is true', () => {
    const today = new Date();
    const dispatch = jest.fn();
    const expectedTask = {
      title: 'test task',
      description: 'test task description',
      agendas: [moment().format('YYYY-MM-DD')],
      dueDate: today.toISOString(),
    };

    const controller = new DetailController(null, true);
    const state = controller.configureDispatch(dispatch);
    state.onSave(
      expectedTask.title,
      expectedTask.description,
      expectedTask.dueDate,
      '',
    );
    expect(dispatch).toBeCalledWith(
      addTask(
        expectedTask.title,
        expectedTask.description,
        expectedTask.dueDate,
        '',
        expectedTask.agendas,
      ),
    );
  });
});
