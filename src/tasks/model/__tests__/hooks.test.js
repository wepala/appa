import {useForm} from '../hooks';
import {act, renderHook} from '@testing-library/react-hooks';

describe('useForm Hook', () => {
  const initValues = {
    title: '',
    description: '',
    project: '',
  };
  it('Should return an updated object with new key value', () => {
    const result = renderHook(() => useForm(initValues));
    act(() => {
      result.current.setValues('My Task', 'title');
    });
    expect(result.current.values).toBe({...initValues, title: 'My task'});
  });
});
