import {createSelector} from 'reselect';

const getByTaskSelector = (state, taskId) => state.getByTaskId.get(taskId);
const getByIdSelector = state => state.getById;
const getByTimeSelector = state => state.getByTime;


export const getLogsByTaskId = createSelector(
  [getByTaskSelector, getByIdSelector],
  (logIds, logs) => logIds.map(logId => logs[logId]),
);
