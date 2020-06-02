import React, {useState} from 'react';
import axios from 'axios';
import {
  ROADMAP_EMAIL,
  ROADMAP_TOKEN,
  ROADMAP_BASEURL,
  ROADMAP_ID,
} from 'react-native-dotenv';
import base64 from 'react-native-base64';

import MainScreen from '../views/screens/Main';

const Main = (props) => {
  const [status, setStatus] = useState('init');
  const [stories, setStories] = useState([]);
  const token = base64.encode(`${ROADMAP_EMAIL}:${ROADMAP_TOKEN}`);

  const addFeedback = (form) => {
    setStatus('pending');
    const feedback = {...form, roadmapId: ROADMAP_ID};

    axios
      .post(`${ROADMAP_BASEURL}/feedback`, feedback, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
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

  const getStories = () => {
    return axios({
      url: `${ROADMAP_BASEURL}/stories/${ROADMAP_ID}`,
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        setStatus('success');
        setStories(res.data);
        console.log('Success', res.data);
        return res.data;
      })
      .catch((error) => {
        setStatus('failure');
        setStories(null);
        console.log('Error', error);
      });
  };

  return (
    <MainScreen
      {...props}
      status={status}
      addFeedback={addFeedback}
      getStories={getStories}
      stories={stories}
    />
  );
};

export default Main;
