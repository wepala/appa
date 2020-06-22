import ConnectController from '../Connect';
import {setToken} from '../../../weos/model/commands';

describe('Connect Controller', () => {
  it('Should provide a method to save auth token', () => {
    const dispatch = jest.fn();
    const controller = new ConnectController();
    controller.configureDispatch(dispatch);
    expect(controller.setToken).toBeDefined();
    controller.setToken('token');
    expect(dispatch).toBeCalledWith(setToken('token'));
  });
});
