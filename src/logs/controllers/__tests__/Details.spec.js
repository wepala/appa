import moment from 'moment';
import DetailController from '../Detail';
import {mockLogs} from '../../__tests__/fixtures';
import {mockTasks} from '../../../tasks/__tests__/fixtures';

describe('Time Log detail controller', () => {
  it('should provide a method for getting log details', () => {
    const controller = new DetailController();
    const mockedState = {
      logs: mockLogs,
      tasks: mockTasks,
    };

    controller.configureState(mockedState);
    const log = controller.getLog('f4cb9236-2df7-4abd-8c06-cb836865a1c3');
    expect(log).toBeDefined();
    expect(log.taskId).toBe('36212c03-040b-4139-867f-bd76485f4084');
    expect(log.startTime).toBe('2020-05-08T10:17:44-04:00');
    expect(log.task.title).toBe('Today Task');
  });

  it('should provide a method for saving a new log', () => {
    const today = moment().format();
    const dispatch = jest.fn();
    const expectedLog = {
      taskId: '22dc4620-66c8-4c02-ac48-3c030d48bfee',
      startTime: today,
    };
    const controller = new DetailController();
    controller.configureDispatch(dispatch);
    controller.onSave(expectedLog.taskId, expectedLog.startTime);
    expect(dispatch).toBeCalled();
    const command = dispatch.mock.calls[dispatch.mock.calls.length - 1][0];
    expect(command.payload.taskId).toBe(expectedLog.taskId);
    expect(command.payload.startTime).toBe(expectedLog.startTime);
  });

  it('should provide a method for updating an existing log', () => {
    const today = moment().format();
    const dispatch = jest.fn();
    const updatedLog = {
      taskId: 'caac3188-4666-4b1f-9ad8-20c65a2871d2',
      startTime: today,
    };
    const logId = '2028f96d-122e-4ca3-9719-308e0d0fd48a';

    const controller = new DetailController();
    controller.configureDispatch(dispatch);
    controller.onUpdate(logId, updatedLog.taskId, updatedLog.startTime);
    expect(dispatch).toBeCalled();
    const command = dispatch.mock.calls[dispatch.mock.calls.length - 1][0];
    expect(command.payload.taskId).toBe(updatedLog.taskId);
    expect(command.payload.startTime).toBe(updatedLog.startTime);
  });

  it('should provide a method for retrieving todays tasks', () => {
    const mockedState = {
      tasks: mockTasks,
    };

    const controller = new DetailController();
    controller.configureState(mockedState);
    const tasks = controller.getTasks();
    expect(tasks).toHaveLength(4);
  });

  it('should provide a method for deleting a log entry', () => {
    const dispatch = jest.fn();
    const controller = new DetailController();
    controller.configureDispatch(dispatch);
    const logId = '2028f96d-122e-4ca3-9719-308e0d0fd48a';

    controller.onRemove(logId);
    expect(dispatch).toBeCalled();
    const command = dispatch.mock.calls[dispatch.mock.calls.length - 1][0];
    expect(command.payload.id).toBe(logId);
  });
});
