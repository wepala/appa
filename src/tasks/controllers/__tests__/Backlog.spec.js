import {mockTasks} from '../../__tests__/fixtures';
import {mockLogs} from '../../../logs/__tests__/fixtures';
import BacklogController from '../Backlog';
import {updateTask} from '../../model/commands';
import moment from 'moment';

describe('Backlog Controller', () => {
  const mockedState = {
    tasks: mockTasks,
    logs: mockLogs,
  };
  it('should have a property that only shows incomplete items', () => {
    const controller = new BacklogController();
    const state = controller.configureState(mockedState);
    expect(state.items).toBeArrayOfSize(4);
  });

  it('should provide a method for adding a task to the current work agenda', () => {
    const dispatch = jest.fn();

    const controller = new BacklogController();
    controller.configureState(mockedState);
    const state = controller.configureDispatch(dispatch);
    const today = moment().format('YYYY-MM-DD');
    const futureDate = moment().add(2, 'days').format('YYYY-MM-DD');
    const task = mockTasks.getById['7a5fe6af-27f5-486b-a32d-4d3d0437d0c3'];
    state.addToAgenda(task, today);
    expect(dispatch).toBeCalledWith(
      updateTask('7a5fe6af-27f5-486b-a32d-4d3d0437d0c3', {
        agendas: [futureDate, today],
      }),
    );
  });

  it('should provide a method for marking a task as complete', () => {
    const dispatch = jest.fn();

    const controller = new BacklogController();
    controller.configureState(mockedState);
    const state = controller.configureDispatch(dispatch);
    const task = mockTasks.getById['7a5fe6af-27f5-486b-a32d-4d3d0437d0c3'];
    controller.setTaskCompletion(task.id, true);
    expect(dispatch).toBeCalledWith(
      updateTask('7a5fe6af-27f5-486b-a32d-4d3d0437d0c3', {
        complete: true,
      }),
    );
  });
});
