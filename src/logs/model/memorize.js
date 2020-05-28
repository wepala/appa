import {getLogItems} from './selectors';
import {tasksSelector} from '../../tasks/model/selectors';

export const memorizeLogsFilter = (state) => {
  const cache = {};

  return function (startTime, endTime, taskId) {
    let logs = getLogItems(state, {taskId, startTime, endTime});
    let tasks = tasksSelector(state);
    let key = JSON.stringify(arguments);

    if (cache[key]) {
      return cache[key];
    } else {
      let result = (logs = logs.map((log) => {
        let taskIndex = tasks.findIndex((task) => {
          return task.id === log.taskId;
        });

        return {
          task: tasks[taskIndex],
          ...log,
        };
      }));

      cache[key] = result;
      return result;
    }
  };
};
