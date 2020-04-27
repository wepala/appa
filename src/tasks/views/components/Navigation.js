import React from 'react';
import TaskList from '../../controllers/TaskList';
import TaskCreate from '../../controllers/TaskCreate';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
    <Screen name="TaskList" component={TaskList} />
    <Screen name="CreateTask" component={TaskCreate} />
  </Navigator>
);
