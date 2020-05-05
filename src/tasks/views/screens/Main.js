import React from 'react';
import List from './List';
import DetailController from '../../controllers/Detail';
import Detail from './Detail';
import {createStackNavigator} from '@react-navigation/stack';
import {Component} from '../../../weosHelpers';

const {Navigator, Screen} = createStackNavigator();

export default () => {
  return (
    <Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Screen name="TaskList" component={List} />
      <Screen
        name="CreateTask"
        component={Component(new DetailController(), Detail)}
        initialParams={{id: '', section: 'agenda'}}
      />
      <Screen
        name="UpdateTask"
        component={Component(new DetailController(), Detail)}
        initialParams={{id: ''}}
      />
    </Navigator>
  );
};
