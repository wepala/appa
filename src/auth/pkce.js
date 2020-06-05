import randomString from 'random-string';
import Hashes from 'jshashes';

// PKCE config vars (used in creating the authorizeURL)
const config = {
  vars: {},
  setVars(vals) {
    return (this.vars = vals);
  },
};

// Preamble for setting up authorizeURL function
const STATE = randomString();

const verifier = randomString({length: 48});

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
  const codeChallenge = challenge(verifier);

  return `${AUTHORIZE_URL}/auth?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&state=${STATE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&code_challenge=${codeChallenge}&code_challenge_method=${CODE_CHALLENGE_METHOD}`;
};

const pkce = {
  config,
  authorizeURL,
};

export default pkce;
