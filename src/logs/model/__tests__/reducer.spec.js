import logs from '../reducer';
import moment from 'moment';
import {addTimeLog} from '../commands';

describe('logs reducer', function() {
  const expectedInitialState = {getByTaskId: {}};

  it('should return initial model', () => {
    expect(logs(undefined, {})).toEqual(expectedInitialState);
  });

  it('should handle creating a log', () => {
    const taskId = '36212c03-040b-4139-867f-bd76485f4084';
    const startTime = moment();

    const state = logs(expectedInitialState, addTimeLog(taskId, startTime));
    expect(state.getByTaskId[taskId]).toBeDefined();
    expect(state.getByTaskId[taskId].startTime).toBe(startTime);
    expect(state === expectedInitialState).toBe(false);
  });
});
