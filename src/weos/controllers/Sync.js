import {Controller} from '../../controller';

export default class SyncController extends Controller {
  constructor() {
    super();
  }

  getEvents() {}

  pushEvents() {
    return new Promise((resolve, reject) => {
      resolve({
        message: 'Ok',
        sequenceNo: 0,
      });
    });
  }
}
