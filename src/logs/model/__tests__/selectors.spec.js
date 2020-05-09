import {mockLogs} from '../../__tests__/fixtures';
import {
  getLogsByTaskId,
  getTimeSpentByTaskId,
  getTimeSpentByDay,
} from '../selectors';
import {mockTasks} from '../../../tasks/__tests__/fixtures';
import {addTimeLog} from '../commands';
import logs from '../reducer';
import moment from 'moment';

describe('Time Log Selectors', () => {
  it('should get task logs', () => {
    const mockState = {
      tasks: mockTasks,
      logs: mockLogs,
    };
    const logs = getLogsByTaskId(
      mockLogs,
      '36212c03-040b-4139-867f-bd76485f4084',
    );
    expect(logs).toBeArrayOfSize(2);
    expect(logs[0]).toBe(
      mockLogs.getById.get('f4cb9236-2df7-4abd-8c06-cb836865a1c3'),
    );
    expect(logs[1]).toBe(
      mockLogs.getById.get('8f38fb66-ddbd-4762-a125-17f81a1a5f5a'),
    );
  });

  it('should have a method for getting time spent on a task', () => {
    const timeSpent = getTimeSpentByTaskId(
      mockLogs,
      '36212c03-040b-4139-867f-bd76485f4084',
    );
    expect(timeSpent).toBe(7200);
  });

  it('should have a method for getting time spent on a task on a given day', () => {
    const timeSpent = getTimeSpentByDay(
      mockLogs,
      '36212c03-040b-4139-867f-bd76485f4084',
      '2020-05-08',
    );
    expect(timeSpent).toBe(3600);
  });

  it('should only recompute if state is updated or paramter changed', () => {
    const timeSpent = getTimeSpentByDay(
      mockLogs,
      '36212c03-040b-4139-867f-bd76485f4084',
      '2020-05-08',
    );
    expect(timeSpent).toBe(3600);
    getTimeSpentByDay(
      mockLogs,
      '36212c03-040b-4139-867f-bd76485f4084',
      '2020-05-08',
    );
    expect(getTimeSpentByDay.recomputations()).toBe(1);
    getTimeSpentByDay(
      mockLogs,
      '36212c03-040b-4139-867f-bd76485f4084',
      '2020-05-08',
    );
    expect(getTimeSpentByDay.recomputations()).toBe(1);
    const updatedState = logs(
      mockLogs,
      addTimeLog('36212c03-040b-4139-867f-bd76485f4084', moment().format()),
    );
    getTimeSpentByDay(
      updatedState,
      '36212c03-040b-4139-867f-bd76485f4084',
      '2020-05-08',
    );
    expect(getTimeSpentByDay.recomputations()).toBe(2);
  });
});
