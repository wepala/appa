import logs from '../reducer';
import moment from 'moment';
import {addTimeLog, updateTimeLog, removeTimeLog} from '../commands';
import {mockLogs} from '../../__tests__/fixtures';

describe('logs reducer', function() {
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

  it('should handle updating a log', () => {
    const today = moment();
    const mockedUpdateLog = {
      id: 'f4cb9236-2df7-4abd-8c06-cb836865a1c3',
      taskId: '45bd1547-c867-40fd-b602-64dd4ed7d69e',
      startTime: today,
    };

    const state = mockLogs;
    const timeLogState = logs(
      state,
      updateTimeLog(
        mockedUpdateLog.id,
        mockedUpdateLog.taskId,
        mockedUpdateLog.startTime,
      ),
    );

    let log = state.getById.get(mockedUpdateLog.id);

    expect(timeLogState.getByTime.get(log.startTime)).not.toBeDefined();
    expect(timeLogState.getByTaskId.get(log.taskId)).not.toEqual(
      expect.arrayContaining([log.id]),
    );

    expect(timeLogState.getById.get(mockedUpdateLog.id).taskId).toBe(
      mockedUpdateLog.taskId,
    );

    expect(timeLogState.getById.get(mockedUpdateLog.id).startTime).toBe(
      mockedUpdateLog.startTime,
    );

    expect(timeLogState.getByTaskId.get(mockedUpdateLog.taskId)).toEqual(
      expect.arrayContaining([mockedUpdateLog.id]),
    );

    expect(timeLogState.getByTime.get(mockedUpdateLog.startTime)).toEqual(
      mockedUpdateLog.id,
    );

    expect(timeLogState === state).toBe(false);
  });

  it('should handle removing a log', () => {
    const logToRemove = 'f4cb9236-2df7-4abd-8c06-cb836865a1c3';
    const state = mockLogs;
    const timeLogState = logs(state, removeTimeLog(logToRemove));
    let log = state.getById.get(logToRemove);

    expect(timeLogState.getByTime.get(log.startTime)).not.toBeDefined();
    expect(timeLogState.getByTaskId.get(log.taskId)).not.toEqual(
      expect.arrayContaining([log.id]),
    );
    expect(timeLogState.getById.get(log.id)).not.toBeDefined();
    expect(timeLogState === state).toBe(false);
  });
});
