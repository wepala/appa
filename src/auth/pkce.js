import {AsyncStorage} from 'react-native';
import randomString from 'random-string';
import Hashes from 'jshashes';
import qs from 'querystring';
// import {
//   setTokenRequest,
//   setTokenSuccess,
//   setTokenFailure,
// } from '../state/token/actions';

// Async storage funcs
const storeVerifier = async verifier => {
  try {
    await AsyncStorage.setItem('VERIFIER', verifier);
  } catch (error) {
    // Error saving data
  }
};

const retrieveVerifier = async () => {
  try {
    const value = await AsyncStorage.getItem('VERIFIER');
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

const removeVerifier = async () => {
  try {
    await AsyncStorage.removeItem('VERIFIER');
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

// PKCE config vars (used in creating the authorizeURL)
export const config = {
  vars: {},
  setVars(vals) {
    return (this.vars = vals);
  },
};

// Preamble for setting up authorizeURL function
export const generateState = redirect_uri => {
  return randomString();
};

const base64URLEncode = str => {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const verifier = randomString({length: 40});
const sha256base64urlencode = str => {
  // https://tools.ietf.org/html/rfc7636#appendix-A
  // https://tools.ietf.org/html/rfc4648#section-5
  return new Hashes.SHA256()
    .b64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/g, '');
};

export const challenge = codeVerifier => sha256base64urlencode(codeVerifier);

// Authorize URL, (used to redirect to login with code challenge)
export const authorizeURL = () => {
  const {
    BASE_URL,
    RESPONSE_TYPE,
    CLIENT_ID,
    SCOPE,
    REDIRECT_URI,
    CODE_CHALLENGE_METHOD,
  } = config.vars;

  let tempVerifier = verifier;
  storeVerifier(tempVerifier);
  console.log(retrieveVerifier());

  const codeChallenge = challenge(tempVerifier);
  const STATE = generateState(REDIRECT_URI);

  return `${BASE_URL}/auth?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&state=${STATE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&code_challenge=${codeChallenge}&code_challenge_method=${CODE_CHALLENGE_METHOD}`;
};

// Echange Code for token
// export const exchangeAuthCode = (code) => {
//   console.log('Gonna exchange code for token...');
//   const {BASE_URL, CLIENT_ID, REDIRECT_URI} = pkceConfig.config;
//   const appVerifier = retrieveVerifier();

//   const form = {
//     grant_type: 'authorization_code',
//     client_id: CLIENT_ID,
//     code_verifier: appVerifier,
//     code,
//     redirect_uri: REDIRECT_URI,
//   };

//   const config = {
//     method: 'post',
//     url: `${BASE_URL}/token`,
//     headers: {'content-type': 'application/x-www-form-urlencoded'},
//     data: qs.stringify(form),
//   };
//   console.log('The config for axios', config);

//   return (dispatch) => {
//     dispatch(setTokenRequest());
//     return axios(config)
//       .then((res) => {
//         console.log('Token', res);
//         removeVerifier();
//         return dispatch(setTokenSuccess(res.data));
//       })
//       .catch((error) => {
//         console.log(error);
//         return dispatch(setTokenFailure(error));
//       });
//   };
// };

// PKCE object to be import in app
const pkce = {
  config,
  authorizeURL,
  //   exchangeAuthCode,
};

export default pkce;
