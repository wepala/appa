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
    expect(state.items).toBeArrayOfSize(10);
  });

  it('should provide a method to retrieve logs for the tasks filter', () => {
    const task_id = '36212c03-040b-4139-867f-bd76485f4084';
    const controller = new LogsController();
    const state = controller.configureState(mockState, {});
    const dispatch = jest.fn();
    controller.configureDispatch(dispatch);
    console.log(controller);
    const logs = controller.filterByTasks(mockState, task_id);

    expect(logs.length).toBe(2);
  });
});
