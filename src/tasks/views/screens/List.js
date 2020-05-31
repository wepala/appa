import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabBar, Tab, StyleService, useStyleSheet} from '@ui-kitten/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AgendaController from '../../controllers/Agenda';
import Agenda from '../components/Agenda';
import Backlog from '../components/Backlog';
import TopBar from '../components/TopBar';
import {Component} from '../../../weosHelpers';
import BacklogController from '../../controllers/Backlog';

export default (props) => {
  const styles = useStyleSheet(themedStyles);

  const {navigation} = props;
  //setup tabs for current task list and backlog
  const Tabs = createMaterialTopTabNavigator();

  const TopTabBar = ({navigation, state}) => (
    <TabBar
      style={styles.topBar}
      indicatorStyle={styles.indicator}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
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

const themedStyles = StyleService.create({
  topBar: {
    paddingTop: 15,
    paddingBottom: 10,
    shadowColor: '#777',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  indicator: {
    height: 2,
    borderRadius: 0,
  },
});
