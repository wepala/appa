import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from './rootReducer';
import {mapTransformer} from './persist-transformers/mapTransformer';

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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [mapTransformer],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middlewares),
);

export const persistor = persistStore(store);

export default store;
