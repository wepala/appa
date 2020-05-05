import moment from 'moment';
const today = moment();
const futureDate = moment()
  .add(2, 'days')
  .toDate();

export const mockTasks = {
  getById: {
    '36212c03-040b-4139-867f-bd76485f4084': {
      id: '36212c03-040b-4139-867f-bd76485f4084',
      title: 'Today Task',
      description:
        "This is an example of a task that will be on the current day's agenda",
      complete: false,
      dueDate: '2030-12-11',
      project: '32ebd0dd-8c83-4acf-a8d3-3f88c686c742',
      billable: false,
      agendas: [today.format('YYYY-MM-DD')],
    },
    '22dc4620-66c8-4c02-ac48-3c030d48bfee': {
      id: '36212c03-040b-4139-867f-bd76485f4084',
      title: 'Completed Today Task',
      description: 'This is an example of a completed task',
      complete: true,
      dueDate: '2030-12-12',
      project: '32ebd0dd-8c83-4acf-a8d3-3f88c686c742',
      billable: false,
      agendas: [today.format('YYYY-MM-DD')],
    },
    'caac3188-4666-4b1f-9ad8-20c65a2871d2': {
      id: '36212c03-040b-4139-867f-bd76485f4084',
      title: 'No Project Today Task',
      description:
        'This is an example of a task that is not associated to a project',
      complete: false,
      dueDate: '2030-12-12',
      billable: false,
      agendas: [today.format('YYYY-MM-DD')],
    },
    'de2c2c26-cadb-4f06-a819-b1ffcfba35b0': {
      id: '36212c03-040b-4139-867f-bd76485f4084',
      title: 'Overdue Task',
      description: 'This is an example of a task that is overdue',
      complete: false,
      dueDate: '2020-02-02',
      billable: false,
      agendas: [today.format('YYYY-MM-DD')],
    },
    '7a5fe6af-27f5-486b-a32d-4d3d0437d0c3': {
      id: '36212c03-040b-4139-867f-bd76485f4084',
      title: 'Backlog Task',
      description: 'This is an example of a task that is in the backlog',
      complete: false,
      dueDate: '2020-02-02',
      billable: false,
      agendas: [futureDate.toISOString()],
    },
  },
};

it('should have fixtures', () => {
  expect(mockTasks).toBeObject();
});
