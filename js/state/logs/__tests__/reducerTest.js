import logs from '../../logs/reducer';

describe('logs reducer', function() {
  const expectedInitialState = {currentLog: {}, getByIds: {}};

  it('should return initial state', () => {
    expect(logs(undefined, {})).toEqual(expectedInitialState);
  });
});
