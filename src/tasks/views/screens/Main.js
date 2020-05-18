import React from 'react';
import List from './List';
import DetailController from '../../controllers/Detail';
import Detail from './Detail';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Component} from '../../../weos/helpers';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <SafeAreaView style={{flex: 1}}>
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
  </SafeAreaView>
);
