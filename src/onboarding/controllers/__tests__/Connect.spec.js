import ConnectController from '../Connect';
import PKCE from '../../../auth/pkce';

describe('Connect Controller', () => {
  it('Should initialize PKCE configurations', () => {
    PKCE.config.setVars = jest.fn();
    const controller = new ConnectController();
    expect(PKCE.config.setVars).toHaveBeenCalled();
  });

  it('Should provide a method that generates the PKCE authorize url', () => {
    const controller = new ConnectController();
    expect(controller.generateAuthroizeUrl).toBeDefined();
  });

  // it('Should provide a method to save token after successful login', () => {});
});
