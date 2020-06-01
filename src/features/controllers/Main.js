import React, {useState} from 'react';
import {Init} from 'roadmap-node';
import {ROADMAP_EMAIL, ROADMAP_TOKEN} from 'react-native-dotenv';
import base64 from 'react-native-base64';

import MainScreen from '../views/screens/Main';

let client = new Init(
  'akeem.philbert+roadmap@wepala.com',
  base64.encode(
    '5ed50f12acb0fca3e911ab3d|6dee38d6-0ace-48eb-b510-6e25c0e540c0',
  ),
);

const Main = (props) => {
  const [status, setStatus] = useState('init');
  const addFeedback = (form) => {
    const feedback = {...form, roadmapId: '5ed5164b31d74e9553c4f5eb'};
    setStatus('pending');

    console.log(feedback, '\n', client.apiKey);
    client.Feedback.add(feedback, (err, f) => {
      if (err) {
        console.log('Error', err.status, err.message);
        setStatus('failure');
      } else {
        console.log('Created Feedback', f);
        setStatus('success');
      }
    });
  };

  return <MainScreen {...props} status={status} addFeedback={addFeedback} />;
};

export default Main;
