import moment from 'moment';
import {mockTasks} from '../../tasks/__tests__/fixtures';
export const mockLogs = {
  getById: new Map([
    [
      'f4cb9236-2df7-4abd-8c06-cb836865a1c3',
      {
        id: 'f4cb9236-2df7-4abd-8c06-cb836865a1c3',
        startTime: '2020-05-08T10:17:44-04:00',
        taskId: '36212c03-040b-4139-867f-bd76485f4084',
      },
    ],
    [
      '45bd1547-c867-40fd-b602-64dd4ed7d69e',
      {
        id: '45bd1547-c867-40fd-b602-64dd4ed7d69e',
        startTime: '2020-05-08T11:17:44-04:00',
        taskId: '22dc4620-66c8-4c02-ac48-3c030d48bfee',
      },
    ],
    [
      'f05d26bd-69ad-444b-8e2b-1aa055ad4b16',
      {
        id: 'f05d26bd-69ad-444b-8e2b-1aa055ad4b16',
        startTime: '2020-05-08T11:47:44-04:00',
        taskId: 'caac3188-4666-4b1f-9ad8-20c65a2871d2',
      },
    ],
    [
      '2028f96d-122e-4ca3-9719-308e0d0fd48a',
      {
        id: '2028f96d-122e-4ca3-9719-308e0d0fd48a',
        startTime: '2020-05-08T12:47:44-04:00',
        taskId: '_stop',
      },
    ],
    [
      '7acefc62-d630-4e96-b336-4e3d2ba61ab2',
      {
        id: '7acefc62-d630-4e96-b336-4e3d2ba61ab2',
        startTime: '2020-05-09T08:47:44-04:00',
        taskId: 'de2c2c26-cadb-4f06-a819-b1ffcfba35b0',
      },
    ],
    [
      '8f38fb66-ddbd-4762-a125-17f81a1a5f5a',
      {
        id: '8f38fb66-ddbd-4762-a125-17f81a1a5f5a',
        startTime: '2020-05-09T09:07:44-04:00',
        taskId: '36212c03-040b-4139-867f-bd76485f4084',
      },
    ],
    [
      '4c77b105-af6c-471c-bdaa-990cb0f76302',
      {
        id: '4c77b105-af6c-471c-bdaa-990cb0f76302',
        startTime: '2020-05-09T10:07:44-04:00',
        taskId: '_stop',
      },
    ],
    [
      '68e5110a-05c4-43af-b187-8eaa4e7584c1',
      {
        id: '68e5110a-05c4-43af-b187-8eaa4e7584c1',
        startTime: moment(),
        taskId: 'de2c2c26-cadb-4f06-a819-b1ffcfba35b0',
      },
    ],
    [
      '4838181e-304b-4324-92dd-08ea01cfd121',
      {
        id: '4838181e-304b-4324-92dd-08ea01cfd121',
        startTime: moment(),
        taskId: 'caac3188-4666-4b1f-9ad8-20c65a2871d2',
      },
    ],
    [
      'e834fac7-eb5f-4134-95e5-c8217a2d0a59',
      {
        id: 'e834fac7-eb5f-4134-95e5-c8217a2d0a59',
        startTime: moment(),
        taskId: '_stop',
      },
    ],
  ]),
  getByTaskId: new Map([
    [
      '36212c03-040b-4139-867f-bd76485f4084',
      [
        'f4cb9236-2df7-4abd-8c06-cb836865a1c3',
        '8f38fb66-ddbd-4762-a125-17f81a1a5f5a',
      ],
    ],
    [
      '22dc4620-66c8-4c02-ac48-3c030d48bfee',
      ['22dc4620-66c8-4c02-ac48-3c030d48bfee'],
    ],
  ]),
  getByTime: new Map([
    ['2020-05-08T10:17:44-04:00', 'f4cb9236-2df7-4abd-8c06-cb836865a1c3'],
    ['2020-05-08T11:17:44-04:00', '45bd1547-c867-40fd-b602-64dd4ed7d69e'],
    ['2020-05-08T11:47:44-04:00', 'f05d26bd-69ad-444b-8e2b-1aa055ad4b1'],
    ['2020-05-08T12:47:44-04:00', '2028f96d-122e-4ca3-9719-308e0d0fd48a'],
    ['2020-05-09T08:47:44-04:00', '7acefc62-d630-4e96-b336-4e3d2ba61ab2'],
    ['2020-05-09T09:07:44-04:00', '8f38fb66-ddbd-4762-a125-17f81a1a5f5a'],
    ['2020-05-09T10:07:44-04:00', '4c77b105-af6c-471c-bdaa-990cb0f76302'],
  ]),
};

it('should have fixtures', () => {
  expect(mockLogs).toBeObject();
});

