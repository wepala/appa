const events = [
  {
    type: 'ADD_TASK',
    payload: {
      id: '56268018-3057-4a75-80f2-281df7221c9a',
      title: 'Complete Redux tutoral',
      description: 'Finish effects, state, reducers',
      project: 'wepala',
      created: '2020-04-26',
      dueDate: '2020-04-26',
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
      created: '2020-04-26',
      dueDate: '2020-05-26',
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
      created: '2020-04-26',
      dueDate: '2020-04-26',
    },
    meta: {
      id: '56268018-3057-4a75-80f2-281df7221c9f',
      seqeuenceNo: 2,
      created: '2020-04-14',
    },
  },
  {
    type: 'REMOVE_TASK',
    payload: {
      id: '56268018-3057-4a75-80f2-281df7221c9b',
      title: 'Complete React tutoral',
      description: 'Finish effects, state, reducers',
      project: 'wepala',
      created: '2020-04-26',
      dueDate: '2020-05-26',
    },
    meta: {
      id: '56268018-3057-4a75-80f2-281df7221c9i',
      seqeuenceNo: 1,
      created: '2020-04-14T20:00:59+00:00',
    },
  },
  {
    type: 'UPDATE_TASK',
    payload: {
      id: '56268018-3057-4a75-80f2-281df7221c9C',
      title: 'Complete lumen tutoral',
      description: 'Finish effects, state, reducers',
      project: 'wepala',
      created: '2020-04-26',
      dueDate: '2020-05-26',
    },
    meta: {
      id: '56268018-3057-4a75-80f2-281df7221c9k',
      seqeuenceNo: 2,
      created: '2020-04-14T20:00:59+00:00',
    },
  },
];

export default events;
