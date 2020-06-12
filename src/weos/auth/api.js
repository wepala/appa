import axios from 'axios';
import {AUTHORIZE_URL} from 'react-native-dotenv';

export async function fetchToken(payload) {
  const response = await axios.post(`${AUTHORIZE_URL}/oauth2/token`, payload, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.status >= 400) {
    throw new Error(response.data.error);
  }

  return response.data;
}
