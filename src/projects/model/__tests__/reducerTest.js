import logs from '../reducer';

describe('logs reducer', function() {
  const expectedInitialState = {currentLog: {}, getByIds: {}};

  it('should return initial model', () => {
    expect(logs(undefined, {})).toEqual(expectedInitialState);
  });
});
