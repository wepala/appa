import {combineReducers} from 'redux';
import tasks from './tasks/reducer';

const rootReducer = combineReducers({
  tasks,
});

export default rootReducer;
