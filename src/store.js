import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initialState = {
  onboard: {onBoarded: false},
  projects: {
    getById: {},
  },
  tasks: {
    getById: {},
  },
  logs: {
    getByTaskId: new Map(),
    getById: new Map(),
    getByTime: new Map(),
  },
};
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares),
);

export default store;
