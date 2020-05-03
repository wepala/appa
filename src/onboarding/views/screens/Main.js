import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './Welcome';
import Connect from './Connect';
import CompleteController from '../../controllers/Complete';
import CompleteScreen from '../../views/screens/Complete';
import {Component} from '../../../weosHelpers';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <Navigator initialRouteName="Welcome" screenOptions={{gestureEnabled: false}}>
    <Screen name="Welcome" component={Welcome} />
    <Screen name="Connect" component={Connect} />
    <Screen
      name="Complete"
      component={Component(new CompleteController(), CompleteScreen)}
    />
  </Navigator>
);
