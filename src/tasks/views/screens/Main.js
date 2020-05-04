import React from 'react';
import List from './List';
import TaskDetail from '../../controllers/Detail';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <SafeAreaView style={{flex: 1}}>
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
  </SafeAreaView>
);
