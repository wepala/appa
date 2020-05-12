import {mockLogs} from '../../__tests__/fixtures';
import {
  getLogsByTaskId,
  getTimeSpentByTaskId,
  getTimeSpentByDay,
  getTaskTimeSpentByDate,
  getLogsByFilter,
} from '../selectors';
import {mockTasks} from '../../../tasks/__tests__/fixtures';
import {addTimeLog} from '../commands';
import logs from '../reducer';
import moment from 'moment';

describe('Time Log Selectors', () => {
  const mockState = {
    tasks: mockTasks,
    logs: mockLogs,
  };
  it('should get task logs', () => {
    const logs = getLogsByTaskId(
      mockState,
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
      mockState,
      '36212c03-040b-4139-867f-bd76485f4084',
    );
    expect(timeSpent).toBe(7200);
  });

  it('should have a method for getting time spent on a task on a given day', () => {
    const timeSpent = getTimeSpentByDay(mockState, '2020-05-08');
    expect(timeSpent).toBe(9000);
  });

  it('should only recompute if state is updated or paramter changed', () => {
    const timeSpent = getTimeSpentByDay(mockState, '2020-05-08');
    expect(timeSpent).toBe(9000);
    getTimeSpentByDay(mockState, '2020-05-08');
    expect(getTimeSpentByDay.recomputations()).toBe(1);
    getTimeSpentByDay(mockState, '2020-05-08');
    expect(getTimeSpentByDay.recomputations()).toBe(1);
    const updatedState = Object.assign({}, mockState, {
      logs: logs(
        mockState.logs,
        addTimeLog('36212c03-040b-4139-867f-bd76485f4084', moment().format()),
      ),
    });
    getTimeSpentByDay(updatedState, '2020-05-08');
    expect(getTimeSpentByDay.recomputations()).toBe(2);
  });

  it('should have select to get the totals by date for each task on the date', () => {
    const timeTotals = getTaskTimeSpentByDate(mockState, '2020-05-08');
    expect(timeTotals[0]).toBe(3600);
  });

  it('should provide a selector for getting a list of logs based on filters chosen', () => {
    let props = {};
    let logs = getLogsByFilter(mockState, props);
    //no filters
    expect(logs).toBeArrayOfSize(10);
    //filter by date
    props = Object.assign({}, props, {
      startTime: '2020-05-08T00:00:00-04:00',
      endTime: '2020-05-08T23:59:59-04:00',
    });
    logs = getLogsByFilter(mockState, props);
    expect(logs).toBeArrayOfSize(4);
    //add task filter
    props = Object.assign({}, props, {
      taskId: '36212c03-040b-4139-867f-bd76485f4084',
    });
    logs = getLogsByFilter(mockState, props);
    expect(logs).toBeArrayOfSize(1);
  });
});
