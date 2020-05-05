const events = [
  {
    type: 'ADD_TASK',
    payload: {
      id: '56268018-3057-4a75-80f2-281df7221c9a',
      title: 'Complete Redux tutoral',
      description: 'Finish effects, state, reducers',
      project: 'wepala',
      created: new Date().toISOString(),
      dueDate: '2020-05-10',
    },
    meta: {
      id: '56268018-3057-4a75-80f2-281df7221c9a',
      seqeuenceNo: 0,
      created: '2020-04-14T20:00:59+00:00',
    },
  },
  {
    type: 'ADD_TASK',
    payload: {
      id: '56268018-3057-4a75-80f2-281df7221c9b',
      title: 'Complete React tutoral',
      description: 'Finish effects, state, reducers',
      project: 'wepala',
      created: new Date().toISOString(),
      dueDate: '2020-05-10',
    },
    meta: {
      id: '56268018-3057-4a75-80f2-281df7221c9i',
      seqeuenceNo: 1,
      created: '2020-04-14T20:00:59+00:00',
    },
  },
  {
    type: 'ADD_TASK',
    payload: {
      id: '56268018-3057-4a75-80f2-281df7221c9C',
      title: 'Complete php tutoral',
      description: 'Finish effects, state, reducers',
      project: 'wepala',
      created: new Date().toISOString(),
      dueDate: '2020-05-10',
    },
    meta: {
      id: '56268018-3057-4a75-80f2-281df7221c9f',
      seqeuenceNo: 2,
      created: '2020-04-14T20:00:59+00:00',
    },
  },
];

export default events;
