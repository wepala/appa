import {Controller} from '../../controller';
import PKCE from '../../weos/auth/pkce';
import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  CODE_CHALLENGE_METHOD,
} from 'react-native-dotenv';
import {setToken} from '../../weos/auth/model/commands';

/**
 * @class ConnectController
 */
export default class ConnectController extends Controller {
  constructor() {
    super();
    PKCE.config.setVars({
      CLIENT_ID,
      AUTHORIZE_URL,
      REDIRECT_URI,
      RESPONSE_TYPE,
      SCOPE,
      CODE_CHALLENGE_METHOD,
    });
  }

  authorizeURL() {
    return PKCE.authorizeURL();
  }

  setToken(token) {
    return new Promise((resolve) => {
      this.dispatch(setToken(token));
      resolve();
    });
  }
}
