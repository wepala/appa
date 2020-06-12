import {fetchToken} from '../api';
import axios from 'axios';

jest.mock('axios');

describe('Auth API', () => {
  it('Should fetch token', async () => {
    axios.post = jest.fn().mockResolvedValue({data: {token: 'token'}});
    let fetchedToken = await fetchToken();
    expect(fetchedToken.token).toEqual('token');
  });

  it('Should throw errors on request failure', async () => {
    axios.post = jest.fn().mockRejectedValue(new Error('Fetch Failed'));
    await expect(fetchToken()).rejects.toThrow('Fetch Failed');
  });
});
