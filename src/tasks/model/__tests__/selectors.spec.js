import {mockTasks} from '../../__tests__/fixtures';
import {getTasksByDate, getIncompleteTasks} from '../selectors';
import moment from 'moment';

describe('Task Selectors', () => {
  it('should have a selector for getting tasks that are scheduled for a specified day', () => {
    const mockState = {
      tasks: mockTasks,
    };
    const items = getTasksByDate(
      mockState,
      moment().format('YYYY-MM-DD'),
    );
    expect(items).toBeArrayOfSize(4);
  });

  it('should have a selector for getting tasks that are not completed', () => {
    const mockState = {
      tasks: mockTasks,
    };
    const items = getIncompleteTasks(mockState);
    expect(items).toBeArrayOfSize(4);
    //confirm the list is sorted in descending order by date
    expect(items[0].title).toBe('No Project Today Task');
  });
});
