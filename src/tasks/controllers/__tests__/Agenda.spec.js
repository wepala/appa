import {mockTasks} from '../../__tests__/fixtures';
import AgendaController from '../Agenda';

describe('Agenda Controller', () => {
  it('should have a property that only shows the items for today', () => {
    const mockedState = {
      tasks: mockTasks,
    };

    const controller = new AgendaController();
    const state = controller.configureState(mockedState);
    expect(state.items).toBeArrayOfSize(4);
  });
});
