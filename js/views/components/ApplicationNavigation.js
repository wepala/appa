import React from 'react';
import {DefaultTheme,NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Tasks} from '../screens/Tasks';
import TasksNavigator from './tasks/TasksNavigator';
import MainMenu from '../screens/MainMenu';

const Drawer = createDrawerNavigator();

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

//this is where you setup the navigation for the entire app
export const AppNavigator = () => (
  <NavigationContainer theme={navigatorTheme}>
    <Drawer.Navigator
      screenOptions={{gestureEnabled: false}}
      drawerContent={props => <MainMenu {...props} />}>
      <Drawer.Screen name="Tasks" component={TasksNavigator} />
      <Drawer.Screen name="Logs" component={TasksNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
);
