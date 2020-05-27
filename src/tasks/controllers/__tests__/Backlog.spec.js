import {mockTasks} from '../../__tests__/fixtures';
import BacklogController from '../Backlog';
import AgendaController from '../Agenda';
import {startTask, updateTask} from '../../model/commands';
import moment from 'moment';

describe('Backlog Controller', () => {
  it('should have a property that only shows incomplete items', () => {
    const mockedState = {
      tasks: mockTasks,
    };

    const controller = new BacklogController();
    const state = controller.configureState(mockedState);
    expect(state.items).toBeArrayOfSize(4);
  });

  it('should provide a method for adding a task to the current work agenda', () => {
    const dispatch = jest.fn();
    const mockedState = {
      tasks: mockTasks,
    };

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
});
