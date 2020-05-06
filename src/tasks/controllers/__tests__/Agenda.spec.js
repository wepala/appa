import {mockTasks} from '../../__tests__/fixtures';
import AgendaController from '../Agenda';
import {startTask, updateTask} from '../../model/commands';

describe('Agenda Controller', () => {
  it('should have a property that only shows the items for today', () => {
    const mockedState = {
      tasks: mockTasks,
    };

    const controller = new AgendaController();
    const state = controller.configureState(mockedState);
    expect(state.items).toBeArrayOfSize(4);
  });

  it('should provide a method for marking a task complete', () => {
    const dispatch = jest.fn();
    const controller = new AgendaController();
    const state = controller.configureDispatch(dispatch);
    state.setTaskCompletion('36212c03-040b-4139-867f-bd76485f4084', true);
    expect(dispatch).toBeCalledWith(
      updateTask('36212c03-040b-4139-867f-bd76485f4084', {complete: true}),
    );
  });

  it('should provide a method for starting a task', () => {
    const dispatch = jest.fn();
    const controller = new AgendaController();
    const state = controller.configureDispatch(dispatch);
    state.startTask('36212c03-040b-4139-867f-bd76485f4084');
    expect(dispatch).toBeCalledWith(
      startTask('36212c03-040b-4139-867f-bd76485f4084'),
    );
  });

  it('should return the current task being worked on', () => {
    const mockInitialState = {
      tasks: mockTasks,
    };
    mockInitialState.tasks.currentTask =
      mockInitialState.tasks.getById['36212c03-040b-4139-867f-bd76485f4084'];
    const controller = new AgendaController();
    const state = controller.configureState(mockInitialState);
    expect(state.currentItem).toBe(
      mockInitialState.tasks.getById['36212c03-040b-4139-867f-bd76485f4084'],
    );
  });
});
