import logs from '../reducer';
import moment from 'moment';
import {addTimeLog} from '../commands';

describe('logs reducer', function() {
  const expectedInitialState = {getByTaskId: [], getById: {}, getByTime: []};

  it('should return initial model', () => {
    expect(logs(undefined, {})).toEqual(expectedInitialState);
  });

  it('should handle creating a log', () => {
    const taskId = '36212c03-040b-4139-867f-bd76485f4084';
    const startTime = moment();
    let uidRegex = /^([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})$/i;

    const state = logs(expectedInitialState, addTimeLog(taskId, startTime));
    expect(Object.keys(state.getById).length).toEqual(1);
    expect(uidRegex.test(Object.keys(state.getById)[0])).toBe(true);
    expect(uidRegex.test(state.getById[Object.keys(state.getById)[0]].id)).toBe(
      true,
    );

    expect(state.getByTaskId[taskId]).toBeArrayOfSize(1);
    expect(state.getByTaskId[taskId][0]).toBe(Object.keys(state.getById)[0]);
    expect(state === expectedInitialState).toBe(false);
  });
});
