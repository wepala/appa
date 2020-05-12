import {eventsApi} from './calls';

export async function fetchEvents() {
  const response = await eventsApi.get('/events/get');

  if (response.status >= 400) {
    throw new Error(response.data.error);
  }

  return response.data;
}
