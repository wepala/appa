import axios from 'axios';

export const eventsApi = axios.create({
  baseURL: 'https://api.wepala.weos-dev.com',
});

eventsApi.interceptors.request.use(
  function(config) {
    // let authToken = localStorage.getItem('token');
    // config.headers.Authorization = `Bearer ${authToken}`;
    // config.headers.ETag = `${applicationId}.${lastCount}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
