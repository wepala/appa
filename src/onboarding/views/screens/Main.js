import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './Welcome';
import Connect from './Connect';
import CompleteController from '../../controllers/Complete';
import ConnectHOC from '../../controllers/ConnectHOC';
import CompleteScreen from '../../views/screens/Complete';
import {Component} from '../../../weosHelpers';

const {Navigator, Screen} = createStackNavigator();

export default (props) => {
  const WrappedConnect = ConnectHOC(Connect, props);

  return (
    <Navigator
      screenOptions={{
        gestureEnabled: false,
      }}
      initialRouteName="Welcome">
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Connect" component={WrappedConnect} />
      <Screen
        name="Complete"
        component={Component(new CompleteController(), CompleteScreen)}
      />
    </Navigator>
  );
};
