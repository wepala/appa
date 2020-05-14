import DetailController from '../Detail';
import moment from 'moment';
import {mockTasks} from '../../__tests__/fixtures';

describe('Task Create Controller', () => {
  it('should create a task in backlog', () => {
    const today = new Date();
    const dispatch = jest.fn();
    const expectedTask = {
      title: 'test task',
      description: 'test task description',
      agendas: [],
      dueDate: today.toISOString(),
      project: '',
      created: moment(),
    };

    const controller = new DetailController();
    const state = controller.configureDispatch(dispatch);
    const promise = state.onSave(
      expectedTask.title,
      expectedTask.description,
      expectedTask.dueDate,
      false,
    );
    expect(dispatch).toBeCalled();
    const command = dispatch.mock.calls[dispatch.mock.calls.length - 1][0];
    expect(command.payload.title).toBe(expectedTask.title);
    //the default estimate time is 15 minutes converted to seconds
    expect(command.payload.estimatedTime).toBe(15 * 60);
    expect(promise).toBeDefined();
  });
  it('should create a task on the current agenda when add to agenda is true', () => {
    const today = new Date();
    const dispatch = jest.fn();
    const expectedTask = {
      title: 'test task',
      description: 'test task description',
      agendas: [moment().format('YYYY-MM-DD')],
      dueDate: today.toISOString(),
      project: '',
      created: moment(),
    };

    const controller = new DetailController();
    const state = controller.configureDispatch(dispatch);
    state.onSave(
      expectedTask.title,
      expectedTask.description,
      expectedTask.dueDate,
      true,
      2,
      'hours',
    );
    expect(dispatch).toBeCalled();
    const command = dispatch.mock.calls[dispatch.mock.calls.length - 1][0];
    expect(command.payload.title).toBe(expectedTask.title);
    expect(command.payload.estimatedTime).toBe(2 * 3600);
  });

  it('should return a task when getTask is called', () => {
    const dispatch = jest.fn();
    const controller = new DetailController();
    const mockedState = {
      tasks: mockTasks,
    };
    controller.configureState(mockedState);
    const state = controller.configureDispatch(dispatch);
    const task = state.getTask('36212c03-040b-4139-867f-bd76485f4084');
    expect(task).toBeDefined();
    expect(task.title).toBe('Today Task');
  });
});
