import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './Welcome';
import Connect from './Connect';
import CompleteController from '../../controllers/Complete';
import ConnectController from '../../controllers/Connect';
import CompleteScreen from '../../views/screens/Complete';
import {Component} from '../../../weos/helpers';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <Navigator
    screenOptions={{
      gestureEnabled: false,
    }}
    initialRouteName="Welcome">
    <Screen name="Welcome" component={Welcome} />
    <Screen
      name="Connect"
      component={Component(new ConnectController(), Connect)}
    />
    <Screen
      name="Complete"
      component={Component(new CompleteController(), CompleteScreen)}
    />
  </Navigator>
);
