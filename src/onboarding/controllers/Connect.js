import {Controller} from '../../controller';
import {setToken} from '../../weos/auth/model/commands';

/**
 * @class ConnectController
 */
export default class ConnectController extends Controller {
  setToken(token) {
    return new Promise((resolve) => {
      this.dispatch(setToken(token));
      resolve();
    });
  }
}
