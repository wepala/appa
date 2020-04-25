import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OnboardNavigation from '../onboarding/controllers/Main';
import MainMenu from './components/MainMenu';
import TasksNavigator from '../tasks/controllers/TasksNavigator';
import {MenuIcon} from './components/Icons';
import {connect} from 'react-redux';
import {SafeAreaLayout} from './components/SafeAreaLayout';

const RootStack = createStackNavigator();
const {Navigator, Screen} = createDrawerNavigator();

const mapStateToProps = state => {
  return {
    onBoarded: state.onboard.onBoarded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowConnect: () => {},
  };
};

const HomeScreen = ({navigation, onBoarded}) => {
  const onItemPress = index => {
    // navigation.navigate(data[index].route);
  };

  const renderDrawerAction = () => <TopNavigationAction icon={MenuIcon} />;

  const MainStackScreen = () => {
    return (
      <Navigator drawerContent={props => <MainMenu {...props} />}>
        <Screen name="Tasks" component={TasksNavigator} />
        <Screen name="Projects" component={TasksNavigator} />
      </Navigator>
    );
  };

  const RootStackScreen = () => {
    if (!onBoarded) {
      return (
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Onboarding"
            component={OnboardNavigation}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      );
    } else {
      return <MainStackScreen />;
    }
  };

  return (
    <NavigationContainer theme={navigatorTheme}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
