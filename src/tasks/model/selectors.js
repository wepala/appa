import {createSelector} from 'reselect';
import moment from 'moment';
const tasksSelector = state => Object.values(state.getById);
/**
 * Get tasks by date
 *
 * @type {OutputSelector<unknown, ({agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean})[], (res: ({agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean})[]) => ({agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [*], dueDate: string, description: string, project: string, id: string, title: string, complete: boolean, billable: boolean} | {agendas: [string], dueDate: string, description: string, id: string, title: string, complete: boolean, billable: boolean})[]>}
 */
export const getTasksByDate = createSelector(
  [tasksSelector],
  (tasks, date) =>
    tasks.filter(
      task =>
        task.agendas?.filter(agenda =>
          agenda.match(new RegExp(moment(date).format('YYYY-MM-DD'))),
        ).length > 0,
    ),
);
