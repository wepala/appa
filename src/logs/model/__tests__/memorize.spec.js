import {mockLogs} from '../../__tests__/fixtures';
import {mockTasks} from '../../../tasks/__tests__/fixtures';
import {memorizeLogsFilter} from '../memorize';

describe('Memorize', () => {
  const mockState = {
    tasks: mockTasks,
    logs: mockLogs,
  };

  it('should provide a function that memorizes results', () => {
    let taskId = '36212c03-040b-4139-867f-bd76485f4084';
    let startDate = '2020-05-08';
    let endDate = '2020-05-08';
    let filterFn = memorizeLogsFilter(mockState);
    let result = filterFn(startDate, endDate, taskId);
    expect(result.length).toBe(1);
  });
});
