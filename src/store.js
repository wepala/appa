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
  eventCount: 0,
  token: null,
  applicationId: '747f53e4-8552-428b-a50d-945bbfff2bdd',
};
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares),
);

export default store;
