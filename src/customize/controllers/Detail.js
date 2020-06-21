import React, {useState} from 'react';
import axios from 'axios';
import {DESTINATION, SENDER, SUPPORT_URL} from 'react-native-dotenv';

import DetailScreen from '../views/screens/Detail';

const Detail = (props) => {
  const [status, setStatus] = useState('init');
  const makeRequest = (form) => {
    console.log(form);
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
        console.log(error);
        setStatus('error');
      });
  };

  return <DetailScreen {...props} status={status} makeRequest={makeRequest} />;
};

export default Detail;
