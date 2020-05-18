import SyncController from '../Sync';
import axios from 'axios';

jest.mock('axios');

describe('Sync Controller', () => {
  it('should provide a method for getting events', () => {
    let mockState = {
      online: true,
      connected: true,
      syncing: false,
    };
    const dispatch = jest.fn();

    const controller = new SyncController();
    let state = controller.configureState(mockState);
    state = controller.configureDispatch(dispatch);
    state.getEvents();
  });

  it('should provide a method for pushing events', async () => {
    const queue = [
      {
        type: 'ADD_TASK',
        payload: {
          id: '56268018-3057-4a75-80f2-281df7221c9a',
          title: 'Complete Redux tutoral',
          description: 'Finish effects, state, reducers',
          project: 'wepala',
          created: '2020-05-08',
          agendas: ['2020-05-08'],
          dueDate: '2020-04-26',
        },
        meta: {
          id: '56268018-3057-4a75-80f2-281df7221c9a',
          created: '2020-04-14T20:00:59+00:00',
        },
      },
    ];

    axios.post.mockResolvedValue({
      message: 'Ok',
      sequenceNo: 0,
    });

    const controller = new SyncController();
    await expect(controller.pushEvents(queue)).resolves.toStrictEqual({
      message: 'Ok',
      sequenceNo: 0,
    });
    //TODO expect it to make a call to the event service with the queue
  });

  // it('should return an error when push fails', () => {});
  //
  // it('should allow for syncing events', () => {
  //   //TODO when sync is called it pulls the events by using `getEvents`
  //   //TODO pushes events that were queued when offline
  //   let mockState = {
  //     online: true,
  //     connected: true,
  //     syncing: false,
  //     queue: [],
  //   };
  // });
  //
  // it('should queue events that were being pushed when sync fails', () => {});
  //
  // it('should not try to sync if offline', () => {
  //   let mockState = {
  //     online: false,
  //     connected: true,
  //     syncing: false,
  //     queue: [],
  //   };
  //   const dispatch = jest.fn();
  //
  //   const controller = new SyncController();
  //   let state = controller.configureState(mockState);
  //   state = controller.configureDispatch(dispatch);
  //   state.sync();
  // });
  //
  // it('should not try to sync if not connected to weos', () => {
  //   let mockState = {
  //     online: true,
  //     connected: false,
  //     syncing: false,
  //     queue: [
  //       {
  //         type: 'ADD_TASK',
  //         payload: {
  //           id: '56268018-3057-4a75-80f2-281df7221c9a',
  //           title: 'Complete Redux tutoral',
  //           description: 'Finish effects, state, reducers',
  //           project: 'wepala',
  //           created: '2020-05-08',
  //           agendas: ['2020-05-08'],
  //           dueDate: '2020-04-26',
  //         },
  //         meta: {
  //           id: '56268018-3057-4a75-80f2-281df7221c9a',
  //           created: '2020-04-14T20:00:59+00:00',
  //         },
  //       },
  //     ],
  //   };
  //   const dispatch = jest.fn();
  //
  //   const controller = new SyncController();
  //   let state = controller.configureState(mockState);
  //   state = controller.configureDispatch(dispatch);
  //   state.getEvents = jest.fn();
  //   state.pushEvents = jest.fn();
  //   expect(state.queue).toBeArrayOfSize(1);
  //   state.sync();
  //   //write check to ensure that getEvents is called
  //   expect(state.getEvents).toBeCalled();
  //   //write check to ensure that pushEvents is called
  //   expect(state.pushEvents).toBeCalledWith(mockState.queue);
  //   //write condition to ensure the queue is empty after sync
  //   expect(state.queue).toBeArrayOfSize(0);
  // });
  //
  // it('should not try to sync if already', () => {
  //   let mockState = {
  //     online: true,
  //     connected: true,
  //     syncing: true,
  //     queue: [],
  //   };
  //   const dispatch = jest.fn();
  //
  //   const controller = new SyncController();
  //   let state = controller.configureState(mockState);
  //   state = controller.configureDispatch(dispatch);
  //   state.sync();
  // });
});
