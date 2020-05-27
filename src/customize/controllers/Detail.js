import React, {createContext} from 'react';
import axios from 'axios';
import {SUPPORT_URL, SENDER, DESTINATION} from 'react-native-dotenv';

import DetailScreen from '../views/screens/Detail';
import {RequestContext} from '../../weosHelpers';

const value = {
  status: null,
  makeRequest: (form) =>
    axios({
      method: 'post',
      url: SUPPORT_URL,
      data: {
        meta: {
          sender: SENDER,
          destination: DESTINATION,
        },
        payload: form,
      },
    })
      .then((res) => {
        console.log('Success!!', res.status);
        this.status = 'success';
      })
      .catch((error) => {
        console.log('Error!!', error);
        this.status = 'error';
      }),
};
const Detail = (props) => (
  <RequestContext.Provider value={value}>
    <DetailScreen {...props} />
  </RequestContext.Provider>
);

export default Detail;
