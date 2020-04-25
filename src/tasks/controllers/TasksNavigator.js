import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  TabBar,
  Tab,
  TopNavigation,
  Divider,
  TopNavigationAction,
} from '@ui-kitten/components';
import TaskList from './TaskList';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MenuIcon} from '../../views/components/Icons';

const {Navigator, Screen} = createMaterialTopTabNavigator();

export default ({navigation}) => {
  const TopTabBar = () => (
    <TabBar selectedIndex={0} onSelect={index => navigation.navigate('Today')}>
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
    <SafeAreaView>
      <TopNavigation
        title="Tasks"
        alignment="center"
        accessoryLeft={MenuAction}
      />
      <Divider />
      <Navigator tabBar={props => <TopTabBar {...props} />}>
        <Screen name="Today" component={TaskList} />
        <Screen name="Backlog" component={TaskList} />
      </Navigator>
    </SafeAreaView>
  );
};
