import {createSelector} from 'reselect';
import moment from 'moment';

const getByTaskSelector = (state, taskId) => state.getByTaskId.get(taskId);
const getByIdSelector = state => state.getById;
const getByTimeSelector = state => [...state.getByTime.keys()];

const getTimesByDate = (state, taskId, date) =>
  taskId !== undefined && taskId !== null
    ? [...state.getByTime.keys()]
        .filter(time => time.startsWith(date))
        .filter(
          time =>
            state.getById.get(state.getByTime.get(time))?.taskId === taskId,
        )
    : [...state.getByTime.keys()].filter(time => time.startsWith(date));
/**
 * get the amount of time spent by day
 *
 * @type {OutputSelector<unknown, boolean|AnimatedNode<number>|number, (res1: unknown[], res2: unknown[]) => (boolean|AnimatedNode<number>|number)>}
 */
export const getTimeSpentByDay = createSelector(
  [getTimesByDate, getByTimeSelector],
  (timesByDate, times) => {
    return timesByDate
      .map(time => moment(times[times.indexOf(time) + 1]).diff(time, 'seconds'))
      .reduce((totalTime, time) => totalTime + time);
  },
);
/**
 * Get logs by task id
 *
 * @type {OutputSelector<unknown, *, (res1: unknown, res2: ({'de2c2c26-cadb-4f06-a819-b1ffcfba35b0': {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean}, 'caac3188-4666-4b1f-9ad8-20c65a2871d2': {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean}, '7a5fe6af-27f5-486b-a32d-4d3d0437d0c3': {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean}, '22dc4620-66c8-4c02-ac48-3c030d48bfee': {agendas: [string], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean}, '36212c03-040b-4139-867f-bd76485f4084': {agendas: [string], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean}}|{})) => *>}
 */
export const getLogsByTaskId = createSelector(
  [getByTaskSelector, getByIdSelector],
  (logIds, logs) => logIds.map(logId => logs.get(logId)),
);
/**
 * Get the amount of time spent by task id
 *
 * @type {OutputSelector<unknown, *, (res1: unknown, res2: ({'de2c2c26-cadb-4f06-a819-b1ffcfba35b0': {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean}, 'caac3188-4666-4b1f-9ad8-20c65a2871d2': {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean}, '7a5fe6af-27f5-486b-a32d-4d3d0437d0c3': {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean}, '22dc4620-66c8-4c02-ac48-3c030d48bfee': {agendas: [string], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean}, '36212c03-040b-4139-867f-bd76485f4084': {agendas: [string], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean}}|{}), res3: unknown[]) => *>}
 */
export const getTimeSpentByTaskId = createSelector(
  [getByTaskSelector, getByIdSelector, getByTimeSelector],
  (logIds, logs, times) => {
    //do a map reduce such that we sum the time difference between the log item we're looking at and the adjacent log
    return logIds
      .map(logId =>
        moment(times[times.indexOf(logs.get(logId).startTime) + 1]).diff(
          logs.get(logId).startTime,
          'seconds',
        ),
      )
      .reduce((totalTime, time) => totalTime + time);
  },
);
