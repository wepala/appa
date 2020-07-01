import React from 'react';
import List from './List';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Component} from '../../../weos/helpers';
import LogsController from '../../controllers/Logs';
import Detail from './Detail';
import DetailController from '../../controllers/Detail';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <SafeAreaView style={{flex: 1}}>
    <Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Screen
        name="LogList"
        component={Component(new LogsController(), List)}
      />
      <Screen
        name="CreateLog"
        component={new Component(new DetailController(), Detail)}
      />
      <Screen
        name="UpdateLog"
        component={new Component(new DetailController(), Detail)}
        initialParams={{id: ''}}
      />
    </Navigator>
  </SafeAreaView>
);
