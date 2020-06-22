import randomString from 'random-string';
import Hashes from 'jshashes';
import AsyncStorage from '@react-native-community/async-storage';
import qs from 'querystring';
import axios from 'axios';

// PKCE config vars (used in creating the authorizeURL)
const config = {
  vars: {},
  setVars(vals) {
    return (this.vars = vals);
  },
};

const storeVerifier = async (verifier) => {
  try {
    await AsyncStorage.setItem('verifier', verifier);
  } catch (error) {
    throw new Error('Unable to save verifier');
  }
};

const storeState = async (state) => {
  try {
    await AsyncStorage.setItem('state', state);
  } catch (error) {
    throw new Error('Unable to save state');
  }
};

const sha256base64urlencode = (str) => {
  // https://tools.ietf.org/html/rfc7636#appendix-A
  // https://tools.ietf.org/html/rfc4648#section-5
  return new Hashes.SHA256()
    .b64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/[=]+/g, '');
};

const challenge = (codeVerifier) => sha256base64urlencode(codeVerifier);

const authorizeURL = () => {
  const {
    AUTHORIZE_URL,
    RESPONSE_TYPE,
    CLIENT_ID,
    SCOPE,
    REDIRECT_URI,
    CODE_CHALLENGE_METHOD,
  } = config.vars;
  const STATE = randomString();
  const verifier = randomString({length: 48});
  const codeChallenge = challenge(verifier);

  storeVerifier(verifier);
  storeState(STATE);
  return `${AUTHORIZE_URL}/oauth2/auth?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&state=${STATE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&code_challenge=${codeChallenge}&code_challenge_method=${CODE_CHALLENGE_METHOD}`;
};

const exchangeAuthCode = async (code, state) => {
  const {AUTHORIZE_URL, CLIENT_ID, REDIRECT_URI} = config.vars;
  const verifier = await AsyncStorage.getItem('verifier');
  const STATE = await AsyncStorage.getItem('state');

  if (!code) {
    throw new Error('Missing auth code');
  }

  if (STATE !== state) {
    throw new Error("State didn't match");
  }

  await AsyncStorage.removeItem('verifier');
  await AsyncStorage.removeItem('state');

  const form = {
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    code_verifier: verifier,
    code,
    redirect_uri: REDIRECT_URI,
  };

  const configs = {
    method: 'post',
    url: `${AUTHORIZE_URL}/oauth2/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(form),
  };
  const response = await axios(configs);
  return response.data;
};

const createAccountURL = (createAccount) => {
  const {AUTHORIZE_URL} = config.vars;
  return `${AUTHORIZE_URL}/create-account?accept_login=${createAccount}`;
};

const logoutURL = (id_token) => {
  const {AUTHORIZE_URL} = config.vars;
  return `${AUTHORIZE_URL}/oauth2/sessions/logout?id_token_hint=${id_token}`;
};

const getUserInfo = async ({access_token, token_type}) => {
  const {AUTHORIZE_URL} = config.vars;
  const configs = {
    method: 'get',
    url: `${AUTHORIZE_URL}/userinfo`,
    headers: {AUTHORIZATION: `${token_type} ${access_token}`},
  };

  const response = await axios(configs);
  return response.data;
};

const pkce = {
  config,
  authorizeURL,
  exchangeAuthCode,
  createAccountURL,
  logoutURL,
  getUserInfo,
};

export default pkce;
