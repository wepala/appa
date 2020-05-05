import * as api from '../eventApi';
import events from '../../__mocks__/events';

import axios from 'axios';

describe('API', () => {
  it('Should fetch events', async () => {
    axios.get.mockResolvedValue({data: events});
    let fetchEvents = await api.fetchEvents();
    expect(fetchEvents).toEqual(events);
  });

  it('Should throw errors on request failure', async () => {
    axios.get.mockRejectedValue(new Error('Fetch Failed'));
    await expect(api.fetchEvents()).rejects.toThrow('Fetch Failed');
  });
});
