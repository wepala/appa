import {combineReducers} from 'redux';
import tasks from './tasks/model/reducer';
import projects from './projects/model/reducer';
import onboard from './onboarding/model/reducer';
import {applicationId, token, eventLastCount} from './reducers';

const rootReducer = combineReducers({
  tasks,
  onboard,
  projects,
  applicationId,
  token,
  eventLastCount,
});

export default rootReducer;
