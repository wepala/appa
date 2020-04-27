import {combineReducers} from 'redux';
import tasks from './tasks/model/reducer';
import projects from './projects/model/reducer';
import onboard from './onboarding/model/reducer';

const rootReducer = combineReducers({
  tasks,
  onboard,
  projects,
});

export default rootReducer;
