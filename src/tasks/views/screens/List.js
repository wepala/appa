import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Agenda from '../../controllers/Agenda';
import Backlog from '../../controllers/Backlog';
import TopBar from '../components/TopBar';

export default props => {
  const {navigation} = props;
  //setup tabs for current task list and backlog
  const Tabs = createMaterialTopTabNavigator();

  const TabNavigation = () => (
    <Tabs.Navigator screenOptions={{gestureEnabled: false}}>
      <Tabs.Screen name="Today" component={Agenda} />
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
