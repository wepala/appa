import logs from '../../logs/reducer';

describe('logs reducer', function() {
  const expectedInitialState = {currentLog: {}, getByIds: {}};

  it('should return initial state', () => {
    expect(logs(undefined, {})).toEqual(expectedInitialState);
  });

  it('should create a new log when task is started')
});
