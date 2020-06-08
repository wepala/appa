import ConnectController from '../Connect';
import PKCE from '../../../weos/auth/pkce';

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

  //TODO it('Should provide a method to save token after successful login', () => {});
});
