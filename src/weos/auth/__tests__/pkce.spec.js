import PKCE from '../pkce';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

jest.mock('axios');

describe('Auth PKCE', () => {
  it('should provide a method to set PKCE configurations', () => {
    expect(PKCE.config.setVars).toBeDefined();
    let config = {
      CLIENT_ID: '33KDSddse323a',
      AUTHORIZE_URL: 'http://localhost/oauth2',
      SCOPE: 'openid',
      CODE_CHALLENGE_METHOD: 'S256',
      REDIRECT_URI: 'com.appadoes',
      RESPONSE_TYPE: 'code',
    };
    expect(PKCE.config.setVars(config)).toEqual(PKCE.config.vars);
  });

  it('should provide a method that generates the authorize Url', () => {
    expect(PKCE.authorizeURL).toBeDefined();
    PKCE.config.setVars({
      CLIENT_ID: '33KDSddse323a',
      AUTHORIZE_URL: 'http://localhost/oauth2',
      SCOPE: 'openid',
      CODE_CHALLENGE_METHOD: 'S256',
      REDIRECT_URI: 'com.appadoes',
      RESPONSE_TYPE: 'code',
    });

    let url = PKCE.authorizeURL();
    expect(url).toMatch('http://localhost/oauth2');
    expect(url).toMatch('client_id=33KDSddse323a');
    expect(url).toMatch('response_type=code');
    expect(url).toMatch('redirect_uri=com.appadoes');
    expect(url).toMatch('scope=openid');
  });

  it('should provide a method that retrieves the auth token', async () => {
    PKCE.config.setVars({
      CLIENT_ID: '33KDSddse323a',
      AUTHORIZE_URL: 'http://localhost/oauth2',
      SCOPE: 'openid',
      CODE_CHALLENGE_METHOD: 'S256',
      REDIRECT_URI: 'com.appadoes',
      RESPONSE_TYPE: 'code',
    });

    AsyncStorage.getItem = jest.fn(() => 'state');
    axios.mockResolvedValue({data: {token: 'token'}});
    let authToken = await PKCE.exchangeAuthCode('23sadfexxe', 'state');
    expect(authToken).toEqual({token: 'token'});
  });

  it('should throw error if auth code is missing', async () => {
    PKCE.config.setVars({
      CLIENT_ID: '33KDSddse323a',
      AUTHORIZE_URL: 'http://localhost/oauth2',
      SCOPE: 'openid',
      CODE_CHALLENGE_METHOD: 'S256',
      REDIRECT_URI: 'com.appadoes',
      RESPONSE_TYPE: 'code',
    });

    AsyncStorage.getItem = jest.fn(() => 'state');
    axios.mockResolvedValue({data: {token: 'token'}});
    await expect(PKCE.exchangeAuthCode(undefined, 'state')).rejects.toThrow(
      'Missing auth code',
    );
  });

  it('should throw error if state does not match', async () => {
    PKCE.config.setVars({
      CLIENT_ID: '33KDSddse323a',
      AUTHORIZE_URL: 'http://localhost/oauth2',
      SCOPE: 'openid',
      CODE_CHALLENGE_METHOD: 'S256',
      REDIRECT_URI: 'com.appadoes',
      RESPONSE_TYPE: 'code',
    });

    AsyncStorage.getItem = jest.fn(() => 'state');
    axios.mockResolvedValue({data: {token: 'token'}});
    await expect(PKCE.exchangeAuthCode('code', 'statee')).rejects.toThrow(
      "State didn't match",
    );
  });
});
