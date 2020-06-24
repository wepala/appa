import React, {useState} from 'react';
import axios from 'axios';
import {ROADMAP_BASEURL, ROADMAP_ID} from 'react-native-dotenv';
import MainScreen from '../views/screens/Main';
import {useSelector} from 'react-redux';
import ConnectController from '../../../onboarding/controllers/Connect';
import {setToken} from '../../weos/model/commands';

const Main = (props) => {
  const [status, setStatus] = useState('init');
  const connectController = new ConnectController();
  const settoken = connectController.setToken;
  const {weos} = useSelector((state) => state);
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

  return (
    <MainScreen
      {...props}
      token={weos.token}
      status={status}
      addFeedback={addFeedback}
      setToken={settoken}
     />
  );
};

export default Main;
