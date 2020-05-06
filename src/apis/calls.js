import axios from 'axios';
import store from '../store';

export const eventsApi = axios.create({
  baseURL: 'https://api.wepala.weos-dev.com',
});

eventsApi.interceptors.request.use(
  function(config) {
    const {token, applicationId, eventLastCount} = store.getState();
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.ETag = `${applicationId}.${eventLastCount}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
