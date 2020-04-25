import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  TabBar,
  Tab,
} from '@ui-kitten/components';
import TaskList from '../../controllers/TaskList';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const TopTabBar = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title="Today" />
    <Tab title="Backlog" />
  </TabBar>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name="Today" component={TaskList} />
    <Screen name="Backlog" component={TaskList} />
  </Navigator>
);

export const Tasks = ({navigation, state}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Tasks" alignment="center" />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TabNavigator />
      </Layout>
    </SafeAreaView>
  );
};
