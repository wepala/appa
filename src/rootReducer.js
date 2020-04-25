import {combineReducers} from 'redux';
import tasks from './tasks/model/reducer';
import onboard from './onboarding/model/reducer';

const rootReducer = combineReducers({
  tasks,
  onboard,
});

export default rootReducer;
