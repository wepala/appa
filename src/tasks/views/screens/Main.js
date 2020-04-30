import React from 'react';
import List from './List';
import TaskDetail from '../../controllers/Detail';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
    <Screen name="TaskList" component={List} />
    <Screen
      name="CreateTask"
      component={TaskDetail}
      initialParams={{itemId: ''}}
    />
    <Screen
      name="UpdateTask"
      component={TaskDetail}
      initialParams={{itemId: ''}}
    />
  </Navigator>
);
