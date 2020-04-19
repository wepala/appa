import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  TabBar,
  Tab,
} from '@ui-kitten/components';
import TaskList from '../../../containers/TaskList';
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

export default () => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name="Today" component={TaskList} />
    <Screen name="Backlog" component={TaskList} />
  </Navigator>
);
