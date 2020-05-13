import React from 'react';
import List from './List';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Component} from '../../../weosHelpers';
import LogsController from '../../controllers/Logs';
import Detail from './Detail';

const {Navigator, Screen} = createStackNavigator();

export default props => (
  <SafeAreaView style={{flex: 1}}>
    <Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Screen
        name="LogList"
        component={new Component(new LogsController(), List, props)}
      />
      <Screen name="CreateLog" component={Detail} />
    </Navigator>
  </SafeAreaView>
);
