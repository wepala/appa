import {combineReducers} from 'redux';
import tasks from './tasks/model/reducer';
import projects from './projects/model/reducer';
import onboard from './onboarding/model/reducer';
import logs from './logs/model/reducer';
import {token} from './weos/auth/model/reducer';

const rootReducer = combineReducers({
  tasks,
  onboard,
  projects,
  logs,
  token,
});

export default rootReducer;
