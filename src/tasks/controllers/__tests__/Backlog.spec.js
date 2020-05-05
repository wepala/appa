import {mockTasks} from '../../__tests__/fixtures';
import BacklogController from '../Backlog';

describe('Backlog Controller', () => {
  it('should have a property that only shows the items for today', () => {
    const mockedState = {
      tasks: mockTasks,
    };

    const controller = new BacklogController();
    const state = controller.configureState(mockedState);
    expect(state.items).toBeArrayOfSize(4);
  });
});
