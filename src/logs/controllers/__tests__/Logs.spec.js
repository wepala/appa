import {mockTasks} from '../../../tasks/__tests__/fixtures';
import {mockLogs} from '../../__tests__/fixtures';
import LogsController from '../Logs';

describe('Log Controller', () => {
  const mockState = {
    tasks: mockTasks,
    logs: mockLogs,
  };

  it('should pass the list of logs to the view', () => {
    const controller = new LogsController();
    const state = controller.configureState(mockState, {});
    expect(state.items).toBeArrayOfSize(7);
  });
});
