import logs from '../reducer';
import moment from 'moment';
import {addTimeLog} from '../commands';

describe('logs reducer', function () {
  const expectedInitialState = {
    getByTaskId: new Map(),
    getById: new Map(),
    getByTime: new Map(),
  };

  it('should return initial model', () => {
    expect(logs(undefined, {})).toEqual(expectedInitialState);
  });

  it('should handle creating a log', () => {
    const taskId = '36212c03-040b-4139-867f-bd76485f4084';
    const startTime = moment();
    let uidRegex = /^([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})$/i;

    const state = logs(expectedInitialState, addTimeLog(taskId, startTime));
    expect(state.getById.size).toEqual(1);
    const key = state.getById.keys().next().value;
    expect(uidRegex.test(key)).toBe(true);
    expect(uidRegex.test(state.getById.get(key).id)).toBe(true);

    expect(state.getByTaskId.size).toEqual(1);
    expect(state.getByTaskId.get(taskId)[0]).toBe(key);
    expect(state === expectedInitialState).toBe(false);
  });
});
