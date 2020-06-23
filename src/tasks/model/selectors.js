import {createSelector} from 'reselect';
import moment from 'moment';

export const tasksSelector = (state) => {
  return Object.values(state.tasks.getById);
};
export const currentTaskSelector = (state) => {
  return state.tasks.currentTask;
};
/**
 * Get tasks by date
 *
 * @type {OutputSelector<unknown, ({agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean})[], (res: ({agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean})[]) => ({agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean})[]>}
 */
export const getTasksByDate = createSelector([tasksSelector], (tasks, date) =>
  tasks.filter(
    (task) =>
      task.agendas?.filter((agenda) =>
        agenda.match(new RegExp(moment(date).format('YYYY-MM-DD'))),
      ).length > 0,
  ),
);

export const getIncompleteTasks = createSelector([tasksSelector], (tasks) =>
  tasks
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
    }),
);

export const getCurrentTask = createSelector(
  [tasksSelector, currentTaskSelector],
  (tasks, currentTask) => {
    console.log('CURR TASK\n', currentTask);
    let currentTaskIndex = tasks.findIndex((task) => {
      return task.id === currentTask.id;
    });
    return tasks[currentTaskIndex];
  },
);
