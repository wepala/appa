import React, {useState} from 'react';
import axios from 'axios';
import {
  ROADMAP_BASEURL,
  ROADMAP_ID,
} from 'react-native-dotenv';
import MainScreen from '../views/screens/Main';
const Main = (props) => {
  const [status, setStatus] = useState('init');

  const addFeedback = (form) => {
    setStatus('pending');

    const feedback = {
      via: 'appa-does',
      user: form.user,
      title:
        'Appa-Does Feedback |  Tags: ' +
        form.tags +
        ' |  Details:' +
        form.title,
      id: ROADMAP_ID,
    };
    console.log('Submitting feedback');
    axios
      .post(`${ROADMAP_BASEURL}/roadmaps/feedback`, feedback)
      .then((res) => {
        setStatus('success');

        console.log('Success', res);
        props.navigation.goBack();
      })
      .catch((error) => {
        setStatus('failure');

        console.log('Error', error);
      });
  };

  return <MainScreen {...props} status={status} addFeedback={addFeedback} />;
};

export default Main;
