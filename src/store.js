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
  applicationId: '36212c03-040b-4139-867f-bd76485f4084', // TODO add acutal applicationId
};
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares),
);

export default store;
