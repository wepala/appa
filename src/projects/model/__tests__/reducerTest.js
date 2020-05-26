import projects from '../reducer';
import {addProject, removeProject, updateProject} from '../commands';

describe('projects reducer', function() {
  const expectedInitialState = {getByIds: {}};

  it('should return initial model', () => {
    expect(projects(undefined, {})).toEqual(expectedInitialState);
  });

  it('should add project to getByIds map with a uid as the key', () => {
    let state = projects(
      undefined,
      addProject({
        title: 'sample project',
        description: 'this is a basic project',
      }),
    );

    let uidRegex = /^([0-9a-fA-F]{8})-(([0-9a-fA-F]{4}-){3})([0-9a-fA-F]{12})$/i;

    expect(state).toBeDefined();
    expect(Object.keys(state.getByIds).length).toEqual(1);
    expect(uidRegex.test(Object.keys(state.getByIds)[0])).toBe(true);
  });

  it('should delete project', () => {
    let mockInitialState = expectedInitialState;
    mockInitialState.getByIds['36212c03-040b-4139-867f-bd76485f4084'] = {
      title: 'test project',
    };
    let state = projects(
      mockInitialState,
      removeProject('36212c03-040b-4139-867f-bd76485f4084'),
    );
    expect(
      state.getByIds['36212c03-040b-4139-867f-bd76485f4084'],
    ).not.toBeDefined();
  });

  it('should update the  project', () => {
    let mockInitialState = expectedInitialState;
    mockInitialState.getByIds['36212c03-040b-4139-867f-bd76485f4084'] = {
      title: 'test project',
    };
    let state = projects(
      mockInitialState,
      updateProject('36212c03-040b-4139-867f-bd76485f4084', {
        title: 'new project title',
      }),
    );
    expect(state.getByIds['36212c03-040b-4139-867f-bd76485f4084'].title).toBe(
      'new project title',
    );
  });
});
