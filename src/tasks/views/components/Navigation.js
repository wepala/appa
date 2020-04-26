import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  TabBar,
  Tab,
  TopNavigation,
  Divider,
  TopNavigationAction,
} from '@ui-kitten/components';
import TaskList from '../../controllers/TaskList';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {MenuIcon} from '../../../views/components/Icons';

const {Navigator, Screen} = createMaterialTopTabNavigator();
// const { Navigator, Screen } = createStackNavigator();

export default ({navigation}) => {
  const TopTabBar = ({navigation, state}) => (
    <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title="Today" />
      <Tab title="Backlog" />
    </TabBar>
  );

  const showMenu = () => {
    navigation.toggleDrawer();
  };

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={showMenu} />
  );

  return (
    <>
      <TopNavigation
        title="Tasks"
        alignment="center"
        accessoryLeft={MenuAction}
      />
      <Divider />
      <Navigator screenOptions={{gestureEnabled: false}}>
        <Screen name="Today" component={TaskList} />
        <Screen name="Backlog" component={TaskList} />
      </Navigator>
      {/*<TaskList />*/}
    </>
  );
};
