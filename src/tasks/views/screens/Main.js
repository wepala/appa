import React from 'react';
import List from './List';
import DetailController from '../../controllers/Detail';
import Detail from './Detail';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Component} from '../../../weosHelpers';
import {TasksContext, useSection} from '../../model/context';

const {Navigator, Screen} = createStackNavigator();

export default () => {
  const taskSection = useSection();
  return (
    <SafeAreaView style={{flex: 1}}>
      <TasksContext.Provider value={taskSection}>
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
      </TasksContext.Provider>
    </SafeAreaView>
  );
};
