import {mockLogs} from '../../__tests__/fixtures';
import {getLogsByTaskId} from '../selectors';
import {mockTasks} from '../../../tasks/__tests__/fixtures';

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
      mockLogs.getById['f4cb9236-2df7-4abd-8c06-cb836865a1c3'],
    );
    expect(logs[1]).toBe(
      mockLogs.getById['8f38fb66-ddbd-4762-a125-17f81a1a5f5a'],
    );
  });
});
