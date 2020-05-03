import {mockTasks} from '../../__tests__/fixtures';
import {getTasksByDate, getIncompleteTasks} from '../selectors';

describe('Task Selectors', () => {
  it('should have a selector for getting tasks that are scheduled for a specified day', () => {
    const today = new Date();
    const mockState = {
      tasks: mockTasks,
    };
    const items = getTasksByDate(mockState.tasks, today.toISOString());
    expect(items).toBeArrayOfSize(4);
  });

  it('should have a selector for getting tasks that are not completed', () => {
    const mockState = {
      tasks: mockTasks,
    };
    const items = getIncompleteTasks(mockState.tasks);
    expect(items).toBeArrayOfSize(4);
  });
});
