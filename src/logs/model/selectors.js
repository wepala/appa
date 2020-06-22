import {createSelector} from 'reselect';
import moment from 'moment';
import {getTasksByDate, tasksSelector} from '../../tasks/model/selectors';

export const getByTaskSelector = (state, taskId) =>
  state.logs.getByTaskId.get(taskId);
export const getByIdSelector = (state) => state.logs.getById;
export const getByTimeSelector = (state) => [...state.logs.getByTime.keys()];

export const getTimesByDate = (state, date) => {
  const times = [...state.logs.getByTime.keys()].filter((time) => {
    return time.startsWith(date);
  });

  const result = new Map();
  times.forEach((time) => {
    result.set(time, state.logs.getByTime.get(time));
  });
  return result;
};
/**
 * get the amount of time spent by day
 *
 * @type {OutputSelector<unknown, boolean|AnimatedNode<number>|number, (res1: unknown[], res2: unknown[]) => (boolean|AnimatedNode<number>|number)>}
 */
export const getTimeSpentByDay = createSelector(
  [getTimesByDate],
  (timesByDate) => {
    const times = [...timesByDate.keys()];
    return times
      .map((time) =>
        times[times.indexOf(time) + 1] !== undefined
          ? moment(times[times.indexOf(time) + 1]).diff(time, 'seconds')
          : null,
      )
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
  (logIds, logs) => logIds.map((logId) => logs.get(logId)),
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
      .map((logId) =>
        moment(times[times.indexOf(logs.get(logId).startTime) + 1]).diff(
          logs.get(logId).startTime,
          'seconds',
        ),
      )
      .reduce((totalTime, time) => totalTime + time);
  },
);

export const getTaskTimeSpentByDate = createSelector(
  [getTimesByDate, getTasksByDate, getByIdSelector],
  (logsByTime, tasks, logs) => {
    const values = [...logsByTime.values()];
    const times = [...logsByTime.keys()];
    return tasks.map((task) => {
      const filteredTimes = times.filter(
        (time, index) => logs.get(values[index])?.taskId === task.id,
      );
      return filteredTimes.length > 0
        ? filteredTimes
            .map((time) => {
              const endTime = times[times.indexOf(time) + 1];
              return endTime !== undefined
                ? moment(endTime).diff(time, 'seconds')
                : 0;
            })
            .reduce((totalTime, time) => totalTime + time)
        : 0;
    });
  },
);

export const getIncompletedTaskTimeSpentByDate = createSelector(
  [getTimesByDate, getTasksByDate, getByIdSelector],
  (logsByTime, tasks, logs) => {
    const values = [...logsByTime.values()];
    const times = [...logsByTime.keys()];
    return tasks
      .filter((task) => !task.complete)
      .sort((a, b) => {
        const d1 = new Date(a.dueDate).getTime();
        const d2 = new Date(b.dueDate).getTime();

        if (d1 < d2) {
          return 1;
        }
        if (d1 > d2) {
          return -1;
        }
        return 0;
      })
      .map((task) => {
        const filteredTimes = times.filter(
          (time, index) => logs.get(values[index])?.taskId === task.id,
        );
        let totalTimeSpent =
          filteredTimes.length > 0
            ? filteredTimes
                .map((time) => {
                  const endTime = times[times.indexOf(time) + 1];
                  return endTime !== undefined
                    ? moment(endTime).diff(time, 'seconds')
                    : 0;
                })
                .reduce((totalTime, time) => totalTime + time)
            : 0;
        return {
          taskId: task.id,
          totalTimeSpent,
        };
      });
  },
);

export const getLogItems = (state, props = {}) => {
  let items = [...state.logs.getById.values()];
  if (props.startTime !== undefined || props.endTime !== undefined) {
    if (props.startTime !== undefined) {
      items = items.filter(
        (item) => item.startTime.substring(0, 10) >= props.startTime,
      );
    }

    if (props.endTime !== undefined) {
      items = items.filter(
        (item) => item.startTime.substring(0, 10) <= props.endTime,
      );
    }
  }

  if (props.taskId !== undefined) {
    items = items.filter((item) => item.taskId === props.taskId);
  }

  return items;
};

const makeLogsByFilter = () =>
  createSelector([getLogItems, tasksSelector], (items, tasks) => {
    return (items = items
      .filter((item) => item.taskId !== '_stop')
      .map((log) => {
        let taskIndex = tasks.findIndex((task) => {
          return task.id === log.taskId;
        });
        return {
          task: tasks[taskIndex],
          ...log,
        };
      })
      .filter((logs) => logs.task !== undefined));
  });

export const getLogsByFilter = makeLogsByFilter();
