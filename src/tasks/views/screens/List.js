import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AgendaController from '../../controllers/Agenda';
import Agenda from '../components/Agenda';
import Backlog from '../../controllers/Backlog';
import TopBar from '../components/TopBar';
import {Component} from '../../../weosHelpers';

export default props => {
  const {navigation} = props;
  //setup tabs for current task list and backlog
  const Tabs = createMaterialTopTabNavigator();

  const TabNavigation = () => (
    <Tabs.Navigator screenOptions={{gestureEnabled: false}}>
      <Tabs.Screen
        name="Today"
        component={Component(new AgendaController(), Agenda)}
      />
      <Tabs.Screen name="Backlog" component={Backlog} />
    </Tabs.Navigator>
  );

  return (
    <>
      <TopBar navigation={navigation} />
      <TabNavigation />
    </>
  );
};
