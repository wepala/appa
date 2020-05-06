import {mockTasks} from '../../__tests__/fixtures';
import AgendaController from '../Agenda';
import {updateTask} from '../../model/commands';

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
    state.completeTask('36212c03-040b-4139-867f-bd76485f4084');
    expect(dispatch).toBeCalledWith(
      updateTask('36212c03-040b-4139-867f-bd76485f4084', {complete: true}),
    );
  });
});
