import ConnectController from '../Connect';
import PKCE from '../../../weos/auth/pkce';
import {setToken} from '../../../weos/auth/model/commands';

describe('Connect Controller', () => {
  it('Should initialize PKCE configurations', () => {
    PKCE.config.setVars = jest.fn();
    const controller = new ConnectController();
    expect(PKCE.config.setVars).toHaveBeenCalled();
  });

  it('Should provide a method that generates the PKCE authorize url', () => {
    const controller = new ConnectController();
    expect(controller.authorizeURL).toBeDefined();
  });

  it('Should provide a method to save auth token', () => {
    const dispatch = jest.fn();
    const controller = new ConnectController();
    controller.configureDispatch(dispatch);
    expect(controller.setToken).toBeDefined();
    controller.setToken('token');
    expect(dispatch).toBeCalledWith(setToken('token'));
  });
});
