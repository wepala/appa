import SyncController from '../Sync';

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
});
