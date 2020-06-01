import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabBar, Tab, Layout, Text} from '@ui-kitten/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AgendaController from '../../controllers/Agenda';
import Agenda from '../components/Agenda';
import Backlog from '../components/Backlog';
import TopBar from '../components/TopBar';
import {Component} from '../../../weosHelpers';
import BacklogController from '../../controllers/Backlog';

export default (props) => {
  const {navigation} = props;
  //setup tabs for current task list and backlog
  const Tabs = createMaterialTopTabNavigator();

  const TopTabBar = ({navigation, state}) => (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{
        paddingTop: 15,
        paddingBottom: 10,
      }}>
      <Tab title="TODAY" />
      <Tab title="BACKLOG" />
    </TabBar>
  );

  return (
    <>
      <TopBar navigation={navigation} />
      <Tabs.Navigator
        tabBar={(props) => <TopTabBar {...props} />}
        screenOptions={{gestureEnabled: false}}>
        <Tabs.Screen
          name="Today"
          component={Component(new AgendaController(), Agenda)}
        />
        <Tabs.Screen
          name="Backlog"
          component={Component(new BacklogController(), Backlog)}
        />
      </Tabs.Navigator>
    </>
  );
};
