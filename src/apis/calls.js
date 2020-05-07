import axios from 'axios';
import store from '../store';

export const eventsApi = axios.create({
  baseURL: 'https://api.wepala.weos-dev.com',
});

eventsApi.interceptors.request.use(
  function(config) {
    const {token, applicationId, eventCount} = store.getState();
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.ETag = `${applicationId}.${eventCount}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
