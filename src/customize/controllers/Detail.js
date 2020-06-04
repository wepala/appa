import React from 'react';
import axios from 'axios';
import {SUPPORT_URL, SENDER, DESTINATION, BEARER} from 'react-native-dotenv';

import DetailScreen from '../views/screens/Detail';
import {useState} from 'react';

const Detail = (props) => {
  const [status, setStatus] = useState('init');
  const makeRequest = (form) => {
    setStatus('pending');
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
        setStatus('success');
      })
      .catch((error) => {
        setStatus('error');
      });
  };

  return <DetailScreen {...props} status={status} makeRequest={makeRequest} />;
};

export default Detail;
