import tasks from '../reducer';
import {addTask, removeTask, updateTask} from '../commands';

describe('task reducer', function() {
  const expectedInitialState = {currentTask: null, getById: {}};

  it('should return initial model', () => {
    expect(tasks(undefined, {})).toEqual(expectedInitialState);
  });

  it('should add task to getById map with a uid as the key', () => {
    const mockInitialState = {currentTask: {}, getById: {}};
    let state = tasks(
      mockInitialState,
      addTask({
        title: 'sample task',
        description: 'this is a basic task',
      }),
    );

    let uidRegex = /^([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})$/i;

    expect(state).toBeDefined();
    expect(Object.keys(state.getById).length).toEqual(1);
    expect(uidRegex.test(Object.keys(state.getById)[0])).toBe(true);
    expect(uidRegex.test(state.getById[Object.keys(state.getById)[0]].id)).toBe(
      true,
    );

    expect(state === mockInitialState).toBe(false);
  });

  it('should delete task', () => {
    let mockInitialState = expectedInitialState;
    mockInitialState.getById['36212c03-040b-4139-867f-bd76485f4084'] = {
      title: 'test task',
    };
    let state = tasks(
      mockInitialState,
      removeTask('36212c03-040b-4139-867f-bd76485f4084'),
    );
    expect(
      state.getById['36212c03-040b-4139-867f-bd76485f4084'],
    ).not.toBeDefined();
    expect(state === mockInitialState).toBe(false);
  });

  it('should update the  task', () => {
    let mockInitialState = expectedInitialState;
    mockInitialState.getById['36212c03-040b-4139-867f-bd76485f4084'] = {
      title: 'test task',
    };
    let state = tasks(
      mockInitialState,
      updateTask('36212c03-040b-4139-867f-bd76485f4084', {
        title: 'new task title',
      }),
    );
    expect(state.getById['36212c03-040b-4139-867f-bd76485f4084'].title).toBe(
      'new task title',
    );
    expect(state === mockInitialState).toBe(false);
  });
});
